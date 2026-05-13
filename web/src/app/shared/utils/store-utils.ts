import { signal } from "@angular/core";

// ─── Interface ─────────────────────────────────────────────────────────────

export interface StoreEntity {
  id: string;
}

// ─── Class ─────────────────────────────────────────────────────────────────

export class StoreUtils<T extends StoreEntity> {
  public data = signal<T[]>([]);

  // ─── Initialisation ──────────────────────────────────────────────────────

  setAll(items: T[]): void {
    this.data.set(items);
  }

  // ─── Ajout ───────────────────────────────────────────────────────────────

  addOne(item: T, limit?: number): void {
    const current = [item, ...this.data()];
    if (limit && current.length > limit) current.pop();
    this.data.set(current);
  }

  addOrEditOne(item: T, limit?: number): void {
    const exists = this.data().some((i) => i.id === item.id);
    exists ? this.editOne(item) : this.addOne(item, limit);
  }

  // ─── Modification ────────────────────────────────────────────────────────

  editOne(item: T): void {
    const current = this.data();
    const index = current.findIndex((i) => i.id === item.id);
    if (index === -1) return;
    const updated = [...current];
    updated[index] = item;
    this.data.set(updated);
  }

  // ─── Suppression ─────────────────────────────────────────────────────────

  deleteOne(id: string): void {
    this.data.set(this.data().filter((i) => i.id !== id));
  }

  // ─── Readers ─────────────────────────────────────────────────────────────

  findOne(id: string): T | undefined {
    return this.data().find((i) => i.id === id);
  }

  findMany(ids: string[]): T[] {
    return this.data().filter((i) => ids.includes(i.id));
  }
}