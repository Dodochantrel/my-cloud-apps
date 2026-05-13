import { signal } from '@angular/core';
import { TreeNode } from 'primeng/api';

// ─── Types ─────────────────────────────────────────────────────────────────

export interface TreeEntity {
  id: string;
  name: string;
  parent?: { id: string } | null;
  children?: TreeEntity[];
}

// ─── Class ─────────────────────────────────────────────────────────────────

export class TreeStoreUtils<T extends TreeEntity> {
  public data = signal<TreeNode<T>[]>([]);

  // ─── Mapping ─────────────────────────────────────────────────────────────

  private toNode(entity: T): TreeNode<T> {
    const children = ((entity.children ?? []) as T[]).map((child) => this.toNode(child));
    return {
      label: entity.name,
      data: entity,
      children,
      leaf: children.length === 0,
    };
  }

  // ─── Initialisation ──────────────────────────────────────────────────────

  setAll(entities: T[]): void {
    this.data.set(entities.map((e) => this.toNode(e)));
  }

  // ─── Ajout ───────────────────────────────────────────────────────────────

  addOne(entity: T, limit?: number): void {
    const node = this.toNode(entity);
    const parentId = entity.parent?.id;

    if (!parentId) {
      this.addToRoot(node, limit);
    } else {
      this.addToParent(node, parentId);
    }
  }

  private addToRoot(node: TreeNode<T>, limit?: number): void {
    const tree = [node, ...this.data()];
    if (limit && tree.length > limit) tree.pop();
    this.data.set(tree);
  }

  private addToParent(node: TreeNode<T>, parentId: string, limit?: number): void {
    const tree = [...this.data()];
    const parent = this.searchNode(tree, parentId);

    if (!parent) return;

    const children = [node, ...(parent.children ?? [])];
    if (limit && children.length > limit) children.pop();

    parent.children = children;
    parent.leaf = false;
    this.data.set([...tree]);
  }

  // ─── Modification ─────────────────────────────────────────────────────────

  editOne(entity: T): void {
    const tree = [...this.data()];
    const node = this.searchNode(tree, entity.id);

    if (!node) return;

    // On met à jour label et data mais on préserve les enfants déjà chargés
    node.label = entity.name;
    node.data = entity;

    this.data.set([...tree]);
  }

  addOrEditOne(entity: T, limit?: number): void {
    const exists = this.searchNode(this.data(), entity.id);
    exists ? this.editOne(entity) : this.addOne(entity, limit);
  }

  // ─── Suppression ─────────────────────────────────────────────────────────

  deleteOne(id: string): void {
    const tree = [...this.data()];

    const rootIndex = tree.findIndex((n) => n.data?.id === id);
    if (rootIndex !== -1) {
      tree.splice(rootIndex, 1);
      this.data.set([...tree]);
      return;
    }

    const parent = this.searchParentNode(tree, id);
    if (!parent?.children) return;

    parent.children = parent.children.filter((n) => n.data?.id !== id);
    parent.leaf = parent.children.length === 0;
    this.data.set([...tree]);
  }

  // ─── Expand / Collapse ───────────────────────────────────────────────────

  expandNode(id: string): void {
    this.setExpanded(id, true);
  }

  collapseNode(id: string): void {
    this.setExpanded(id, false);
  }

  expandAll(): void {
    this.walkTree(this.data(), (n) => (n.expanded = true));
    this.data.set([...this.data()]);
  }

  collapseAll(): void {
    this.walkTree(this.data(), (n) => (n.expanded = false));
    this.data.set([...this.data()]);
  }

  // ─── Readers ─────────────────────────────────────────────────────────────

  findNode(id: string): TreeNode<T> | undefined {
    return this.searchNode(this.data(), id);
  }

  // ─── Private helpers ─────────────────────────────────────────────────────

  private searchNode(nodes: TreeNode<T>[], id: string): TreeNode<T> | undefined {
    for (const node of nodes) {
      if (node.data?.id === id) return node;
      if (node.children?.length) {
        const found = this.searchNode(node.children, id);
        if (found) return found;
      }
    }
    return undefined;
  }

  private searchParentNode(nodes: TreeNode<T>[], childId: string): TreeNode<T> | undefined {
    for (const node of nodes) {
      if (node.children?.some((c) => c.data?.id === childId)) return node;
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
    if (!node) return;
    node.expanded = expanded;
    this.data.set([...tree]);
  }

  private walkTree(nodes: TreeNode<T>[], fn: (node: TreeNode<T>) => void): void {
    for (const node of nodes) {
      fn(node);
      if (node.children?.length) this.walkTree(node.children, fn);
    }
  }
}