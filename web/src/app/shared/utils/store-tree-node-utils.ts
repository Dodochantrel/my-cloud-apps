import { Injectable, signal } from '@angular/core';
import { TreeNode } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class TreeStoreUtils<T> {
  public data = signal<TreeNode<T>[]>([]);

  mapFromEntitiesToTreeNode(categories: T[]): { label: string; data: T; children: any[] }[] {
    return categories.map((category) => ({
      label: (category as any).name,
      data: category,
      children: this.mapFromEntitiesToTreeNode((category as any).childrens || []),
    }));
  }

  mapAndSetData(categories: T[]) {
    const treeNodes = this.mapFromEntitiesToTreeNode(categories);
    this.data.set(treeNodes);
  }

  // ─── Setters ───────────────────────────────────────────────────────────────

  setData(data: TreeNode<T>[]) {
    this.data.set(data);
  }

  addRoot(node: TreeNode<T>) {
    this.data.set([node, ...this.data()]);
  }

  // ─── Readers ───────────────────────────────────────────────────────────────

  findNode(id: string): TreeNode<T> | undefined {
    return this.searchNode(this.data(), id);
  }

  // ─── Mutations ─────────────────────────────────────────────────────────────

  addOne(node: TreeNode<T>, parentId?: string) {
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

  editOne(id: string, updated: Partial<TreeNode<T>>) {
    const tree = [...this.data()];
    const node = this.searchNode(tree, id);

    if (node) {
      Object.assign(node, updated);
      // On préserve les enfants existants si non fournis dans updated
      if (!updated.children) {
        node.children = node.children;
      }
      this.data.set([...tree]);
    }
  }

  addOrEditOne(node: TreeNode<T>, parentId?: string) {
    const id = (node.data as any)?.id;
    const existing = id ? this.searchNode(this.data(), id) : undefined;

    if (existing) {
      this.editOne(id, node);
    } else {
      this.addOne(node, parentId);
    }
  }

  deleteOne(id: string) {
    const tree = [...this.data()];

    // Cas racine
    const rootIndex = tree.findIndex((n) => (n.data as any)?.id === id);
    if (rootIndex !== -1) {
      tree.splice(rootIndex, 1);
      this.data.set([...tree]);
      return;
    }

    // Cas enfant — on cherche le parent et on retire le nœud de ses children
    const parent = this.searchParentNode(tree, id);
    if (parent?.children) {
      parent.children = parent.children.filter((n) => (n.data as any)?.id !== id);
      parent.leaf = parent.children.length === 0;
      this.data.set([...tree]);
    }
  }

  moveOne(id: string, newParentId?: string) {
    const tree = [...this.data()];
    const node = this.searchNode(tree, id);
    if (!node) return;

    // Détacher du parent actuel
    this.deleteOne(id);

    // Rattacher au nouveau parent
    this.addOne(node, newParentId);
  }

  expandNode(id: string) {
    this.setExpanded(id, true);
  }

  collapseNode(id: string) {
    this.setExpanded(id, false);
  }

  expandAll() {
    const tree = [...this.data()];
    this.walkTree(tree, (node) => (node.expanded = true));
    this.data.set([...tree]);
  }

  collapseAll() {
    const tree = [...this.data()];
    this.walkTree(tree, (node) => (node.expanded = false));
    this.data.set([...tree]);
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  private searchNode(nodes: TreeNode<T>[], id: string): TreeNode<T> | undefined {
    for (const node of nodes) {
      if ((node.data as any)?.id === id) return node;
      if (node.children?.length) {
        const found = this.searchNode(node.children, id);
        if (found) return found;
      }
    }
    return undefined;
  }

  private searchParentNode(
    nodes: TreeNode<T>[],
    childId: string,
    parent?: TreeNode<T>,
  ): TreeNode<T> | undefined {
    for (const node of nodes) {
      if (node.children?.some((c) => (c.data as any)?.id === childId)) {
        return node;
      }
      if (node.children?.length) {
        const found = this.searchParentNode(node.children, childId, node);
        if (found) return found;
      }
    }
    return undefined;
  }

  private setExpanded(id: string, expanded: boolean) {
    const tree = [...this.data()];
    const node = this.searchNode(tree, id);
    if (node) {
      node.expanded = expanded;
      this.data.set([...tree]);
    }
  }

  private walkTree(nodes: TreeNode<T>[], fn: (node: TreeNode<T>) => void) {
    for (const node of nodes) {
      fn(node);
      if (node.children?.length) {
        this.walkTree(node.children, fn);
      }
    }
  }
}
