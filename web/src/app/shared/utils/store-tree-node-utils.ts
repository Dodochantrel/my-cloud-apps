import { Injectable, computed, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';

// ─── Types ─────────────────────────────────────────────────────────────────

type WithId = { id: string };
type WithName = { name: string };
type WithChildren<T> = { childrens?: T[] };
type TreeEntity<T> = T & WithId & WithName & WithChildren<T>;

export interface TreeStoreSnapshot<T> {
  data: TreeNode<T>[];
  timestamp: number;
}

// ─── Service ───────────────────────────────────────────────────────────────

@Injectable({
  providedIn: 'root',
})
export class TreeStoreUtils<T extends WithId & WithName & WithChildren<T>> {

  // ─── State ───────────────────────────────────────────────────────────────

  readonly data = signal<TreeNode<T>[]>([]);
  readonly selectedNode = signal<TreeNode<T> | null>(null);
  readonly selectedNodes = signal<TreeNode<T>[]>([]);
  readonly loading = signal<boolean>(false);

  // ─── Computed ────────────────────────────────────────────────────────────

  /** Total number of nodes (including all descendants) */
  readonly totalCount = computed(() => this.countNodes(this.data()));

  /** Number of root-level nodes only */
  readonly rootCount = computed(() => this.data().length);

  /** True if the tree has no nodes */
  readonly isEmpty = computed(() => this.data().length === 0);

  /** All nodes flattened into a single array */
  readonly flatNodes = computed(() => this.flattenTree(this.data()));

  /** All currently expanded nodes */
  readonly expandedNodes = computed(() =>
    this.flatNodes().filter((n) => n.expanded)
  );

  /** All leaf nodes (no children or empty children) */
  readonly leafNodes = computed(() =>
    this.flatNodes().filter((n) => !n.children?.length)
  );

  // ─── History (undo/redo) ─────────────────────────────────────────────────

  private readonly _history: TreeNode<T>[][] = [];
  private readonly _future: TreeNode<T>[][] = [];
  private readonly MAX_HISTORY = 50;

  readonly canUndo = computed(() => this._history.length > 0);
  readonly canRedo = computed(() => this._future.length > 0);

  // ─── Mapping ─────────────────────────────────────────────────────────────

  mapFromEntitiesToTreeNode(entities: T[]): TreeNode<T>[] {
    return entities.map((entity) => this.mapFromEntityToTreeNode(entity));
  }

  mapFromEntityToTreeNode(entity: T): TreeNode<T> {
    const children = this.mapFromEntitiesToTreeNode(entity.childrens ?? []);
    return {
      label: entity.name,
      data: entity,
      children,
      leaf: children.length === 0,
    };
  }

  mapAndSetData(entities: T[]): void {
    this.snapshot();
    this.data.set(this.mapFromEntitiesToTreeNode(entities));
  }

  mapAndAddData(entities: T[]): void {
    this.snapshot();
    const nodes = this.mapFromEntitiesToTreeNode(entities);
    this.data.set([...this.data(), ...nodes]);
  }

  mapAndAddPaginatedData(entities: T[], limit: number, parentId?: string): void {
    this.snapshot();
    const nodes = this.mapFromEntitiesToTreeNode(entities);

    if (parentId) {
      const tree = [...this.data()];
      const parent = this.searchNode(tree, parentId);
      if (!parent) return;

      const current = parent.children ?? [];
      parent.children = [...current, ...nodes].slice(0, limit);
      parent.leaf = parent.children.length === 0;
      this.data.set([...tree]);
      return;
    }

    const merged = [...this.data(), ...nodes];
    this.data.set(merged.slice(0, limit));
  }

  // ─── Setters ─────────────────────────────────────────────────────────────

  setData(nodes: TreeNode<T>[]): void {
    this.snapshot();
    this.data.set(nodes);
  }

  clear(): void {
    this.snapshot();
    this.data.set([]);
    this.selectedNode.set(null);
    this.selectedNodes.set([]);
  }

  setLoading(value: boolean): void {
    this.loading.set(value);
  }

  setSelected(node: TreeNode<T> | null): void {
    this.selectedNode.set(node);
  }

  setSelectedMultiple(nodes: TreeNode<T>[]): void {
    this.selectedNodes.set(nodes);
  }

  // ─── CRUD ────────────────────────────────────────────────────────────────

  addRoot(node: TreeNode<T>): void {
    this.snapshot();
    this.data.set([node, ...this.data()]);
  }

  addOne(node: TreeNode<T>, parentId?: string): void {
    this.snapshot();
    if (!parentId) {
      this.addRoot(node);
      return;
    }

    const tree = [...this.data()];
    const parent = this.searchNode(tree, parentId);
    if (parent) {
      parent.children = [node, ...(parent.children ?? [])];
      parent.leaf = false;
      this.data.set([...tree]);
    }
  }

  addMany(nodes: TreeNode<T>[], parentId?: string): void {
    nodes.forEach((node) => this.addOne(node, parentId));
  }

  editOne(id: string, updated: Partial<TreeNode<T>>): void {
    this.snapshot();
    const tree = [...this.data()];
    const node = this.searchNode(tree, id);
    if (node) {
      const existingChildren = node.children;
      Object.assign(node, updated);
      if (!updated.children) node.children = existingChildren;
      this.data.set([...tree]);
    }
  }

  addOrEditOne(node: TreeNode<T>, parentId?: string): void {
    const id = (node.data as WithId)?.id;
    const exists = id ? !!this.searchNode(this.data(), id) : false;
    exists ? this.editOne(id, node) : this.addOne(node, parentId);
  }

  deleteOne(id: string): void {
    this.snapshot();
    const tree = [...this.data()];

    const rootIndex = tree.findIndex((n) => (n.data as WithId)?.id === id);
    if (rootIndex !== -1) {
      tree.splice(rootIndex, 1);
      this.data.set([...tree]);
      if ((this.selectedNode()?.data as WithId)?.id === id) {
        this.selectedNode.set(null);
      }
      return;
    }

    const parent = this.searchParentNode(tree, id);
    if (parent?.children) {
      parent.children = parent.children.filter((n) => (n.data as WithId)?.id !== id);
      parent.leaf = parent.children.length === 0;
      this.data.set([...tree]);
    }
  }

  deleteMany(ids: string[]): void {
    ids.forEach((id) => this.deleteOne(id));
  }

  moveOne(id: string, newParentId?: string): void {
    const tree = [...this.data()];
    const node = this.searchNode(tree, id);
    if (!node) return;

    const cloned = { ...node };
    this.deleteOne(id);
    this.addOne(cloned, newParentId);
  }

  // ─── Selection ───────────────────────────────────────────────────────────

  selectNode(id: string): void {
    const node = this.findNode(id);
    this.selectedNode.set(node ?? null);
  }

  clearSelection(): void {
    this.selectedNode.set(null);
    this.selectedNodes.set([]);
  }

  isSelected(id: string): boolean {
    return (this.selectedNode()?.data as WithId)?.id === id;
  }

  // ─── Expand / Collapse ───────────────────────────────────────────────────

  expandNode(id: string): void {
    this.setExpanded(id, true);
  }

  collapseNode(id: string): void {
    this.setExpanded(id, false);
  }

  toggleNode(id: string): void {
    const node = this.findNode(id);
    if (node) this.setExpanded(id, !node.expanded);
  }

  expandAll(): void {
    this.walkTree(this.data(), (n) => (n.expanded = true));
    this.data.set([...this.data()]);
  }

  collapseAll(): void {
    this.walkTree(this.data(), (n) => (n.expanded = false));
    this.data.set([...this.data()]);
  }

  expandPath(id: string): void {
    const path = this.getAncestorIds(id);
    path.forEach((ancestorId) => this.setExpanded(ancestorId, true));
  }

  expandToDepth(depth: number): void {
    const tree = [...this.data()];
    this.walkTreeWithDepth(tree, (node, d) => {
      node.expanded = d < depth;
    });
    this.data.set([...tree]);
  }

  // ─── Search & Traversal ──────────────────────────────────────────────────

  findNode(id: string): TreeNode<T> | undefined {
    return this.searchNode(this.data(), id);
  }

  findNodes(predicate: (node: TreeNode<T>) => boolean): TreeNode<T>[] {
    return this.flatNodes().filter(predicate);
  }

  findByLabel(label: string, exact = false): TreeNode<T>[] {
    return this.findNodes((n) =>
      exact
        ? n.label === label
        : n.label?.toLowerCase().includes(label.toLowerCase()) ?? false
    );
  }

  getAncestors(id: string): TreeNode<T>[] {
    const result: TreeNode<T>[] = [];
    let currentId: string | undefined = id;

    while (currentId) {
      const parent = this.searchParentNode(this.data(), currentId);
      if (!parent) break;
      result.unshift(parent);
      currentId = (parent.data as WithId)?.id;
    }

    return result;
  }

  getAncestorIds(id: string): string[] {
    return this.getAncestors(id).map((n) => (n.data as WithId)?.id);
  }

  getChildren(id: string): TreeNode<T>[] {
    return this.findNode(id)?.children ?? [];
  }

  getParent(id: string): TreeNode<T> | undefined {
    return this.searchParentNode(this.data(), id);
  }

  getSiblings(id: string): TreeNode<T>[] {
    const parent = this.getParent(id);
    const list = parent ? (parent.children ?? []) : this.data();
    return list.filter((n) => (n.data as WithId)?.id !== id);
  }

  getDepth(id: string): number {
    return this.getAncestors(id).length;
  }

  hasDescendant(ancestorId: string, descendantId: string): boolean {
    const ancestor = this.findNode(ancestorId);
    if (!ancestor) return false;
    return !!this.searchNode(ancestor.children ?? [], descendantId);
  }

  // ─── Bulk Operations ─────────────────────────────────────────────────────

  sortChildren(id: string, compareFn: (a: TreeNode<T>, b: TreeNode<T>) => number): void {
    this.snapshot();
    const tree = [...this.data()];
    const node = id ? this.searchNode(tree, id) : null;
    const target = node ?? { children: tree };
    if (target.children) {
      target.children = [...target.children].sort(compareFn);
      this.data.set([...tree]);
    }
  }

  sortAll(compareFn: (a: TreeNode<T>, b: TreeNode<T>) => number): void {
    this.snapshot();
    const sort = (nodes: TreeNode<T>[]): TreeNode<T>[] =>
      [...nodes].sort(compareFn).map((n) => ({
        ...n,
        children: n.children ? sort(n.children) : [],
      }));
    this.data.set(sort(this.data()));
  }

  filterTree(predicate: (node: TreeNode<T>) => boolean): TreeNode<T>[] {
    const filter = (nodes: TreeNode<T>[]): TreeNode<T>[] =>
      nodes.reduce<TreeNode<T>[]>((acc, node) => {
        const filteredChildren = filter(node.children ?? []);
        if (predicate(node) || filteredChildren.length > 0) {
          acc.push({ ...node, children: filteredChildren });
        }
        return acc;
      }, []);
    return filter(this.data());
  }

  /** Apply filterTree and update the signal in-place */
  applyFilter(predicate: (node: TreeNode<T>) => boolean): void {
    this.data.set(this.filterTree(predicate));
  }

  updateMany(updates: { id: string; changes: Partial<TreeNode<T>> }[]): void {
    this.snapshot();
    const tree = [...this.data()];
    updates.forEach(({ id, changes }) => {
      const node = this.searchNode(tree, id);
      if (node) {
        const existingChildren = node.children;
        Object.assign(node, changes);
        if (!changes.children) node.children = existingChildren;
      }
    });
    this.data.set([...tree]);
  }

  // ─── History ─────────────────────────────────────────────────────────────

  undo(): void {
    if (!this._history.length) return;
    this._future.push(this.data());
    this.data.set(this._history.pop()!);
  }

  redo(): void {
    if (!this._future.length) return;
    this._history.push(this.data());
    this.data.set(this._future.pop()!);
  }

  /** Manually save a snapshot to undo history */
  snapshot(): void {
    this._history.push([...this.data()]);
    if (this._history.length > this.MAX_HISTORY) this._history.shift();
    this._future.length = 0;
  }

  // ─── Import / Export ─────────────────────────────────────────────────────

  exportSnapshot(): TreeStoreSnapshot<T> {
    return { data: this.data(), timestamp: Date.now() };
  }

  importSnapshot(snapshot: TreeStoreSnapshot<T>): void {
    this.snapshot();
    this.data.set(snapshot.data);
  }

  toJSON(): string {
    return JSON.stringify(this.data());
  }

  fromJSON(json: string): void {
    try {
      const parsed = JSON.parse(json) as TreeNode<T>[];
      this.setData(parsed);
    } catch {
      console.error('[TreeStoreUtils] Failed to parse JSON');
    }
  }

  // ─── Statistics ──────────────────────────────────────────────────────────

  getStats(): {
    total: number;
    roots: number;
    leaves: number;
    maxDepth: number;
    averageDepth: number;
  } {
    const flat = this.flatNodes();
    const depths = flat.map((n) => this.getDepth((n.data as WithId)?.id));
    const maxDepth = depths.length ? Math.max(...depths) : 0;
    const averageDepth = depths.length
      ? depths.reduce((a, b) => a + b, 0) / depths.length
      : 0;

    return {
      total: flat.length,
      roots: this.data().length,
      leaves: this.leafNodes().length,
      maxDepth,
      averageDepth: Math.round(averageDepth * 100) / 100,
    };
  }

  // ─── Private helpers ─────────────────────────────────────────────────────

  private searchNode(nodes: TreeNode<T>[], id: string): TreeNode<T> | undefined {
    for (const node of nodes) {
      if ((node.data as WithId)?.id === id) return node;
      if (node.children?.length) {
        const found = this.searchNode(node.children, id);
        if (found) return found;
      }
    }
    return undefined;
  }

  private searchParentNode(nodes: TreeNode<T>[], childId: string): TreeNode<T> | undefined {
    for (const node of nodes) {
      if (node.children?.some((c) => (c.data as WithId)?.id === childId)) return node;
      if (node.children?.length) {
        const found = this.searchParentNode(node.children, childId);
        if (found) return found;
      }
    }
    return undefined;
  }

  private setExpanded(id: string, expanded: boolean): void {
    const tree = [...this.data()];
    const node = this.searchNode(tree, id);
    if (node) {
      node.expanded = expanded;
      this.data.set([...tree]);
    }
  }

  private walkTree(nodes: TreeNode<T>[], fn: (node: TreeNode<T>) => void): void {
    for (const node of nodes) {
      fn(node);
      if (node.children?.length) this.walkTree(node.children, fn);
    }
  }

  private walkTreeWithDepth(
    nodes: TreeNode<T>[],
    fn: (node: TreeNode<T>, depth: number) => void,
    depth = 0,
  ): void {
    for (const node of nodes) {
      fn(node, depth);
      if (node.children?.length) this.walkTreeWithDepth(node.children, fn, depth + 1);
    }
  }

  private flattenTree(nodes: TreeNode<T>[]): TreeNode<T>[] {
    return nodes.reduce<TreeNode<T>[]>((acc, node) => {
      acc.push(node);
      if (node.children?.length) acc.push(...this.flattenTree(node.children));
      return acc;
    }, []);
  }

  private countNodes(nodes: TreeNode<T>[]): number {
    return nodes.reduce((acc, node) => acc + 1 + this.countNodes(node.children ?? []), 0);
  }
}