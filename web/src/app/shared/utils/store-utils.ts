import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class StoreUtils<T> {
  public data = signal<T[]>([]);

  setData(data: T[]) {
    this.data.set(data);
  }

  addOne(item: T) {
    const currentData = this.data();
    this.data.set([item, ...currentData]);
  }

  addOnePaginated(item: T, limit: number) {
    const currentData = this.data();
    if (currentData.length >= limit) {
      currentData.pop();
    }
    this.data.set([...currentData, item]);
  }

  editOne(id: string, item: T) {
    const currentData = this.data();
    const index = currentData.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      currentData[index] = item;
      this.data.set([...currentData]);
    }
  }

  addOrEditOne(id: string, item: T) {
    const currentData = this.data();
    const index = currentData.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      currentData[index] = item;
    } else {
      currentData.unshift(item);
    }
    this.data.set([...currentData]);
  }

  deleteOne(id: string) {
    const currentData = this.data();
    const index = currentData.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      currentData.splice(index, 1);
      this.data.set([...currentData]);
    }
  }

  findOne(id: string): T | undefined {
    const currentData = this.data();
    return currentData.find((i: any) => i.id === id);
  }

  findMany(ids: string[]): T[] {
    const currentData = this.data();
    return currentData.filter((i: any) => ids.includes(i.id));
  }
}