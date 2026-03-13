import { Injectable, signal } from '@angular/core';
import { Video } from '../../../core/models/videos/video';

@Injectable({
  providedIn: 'root',
})
export class CurrentVideoStore {
  public data = signal<Video[]>([]);

  // Retirer le dernier de la liste et mettre en premier le dernier ajouté
  public addOne(video: Video) {
    const currentData = this.data();
    if (currentData.length >= 10) {
      currentData.pop();
    }
    this.data.set([video, ...currentData]);
  }

  public setData(videos: Video[]) {
    this.data.set(videos);
  }

  public clear() {
    this.data.set([]);
  }

  public getOne(id: string): Video | undefined {
    const currentData = this.data();
    return currentData.find((v) => v.id === id);
  }

  public editOne(id: string, video: Video) {
    const currentData = this.data();
    const index = currentData.findIndex((v) => v.id === id);
    if (index !== -1) {
      currentData[index] = video;
      this.data.set([...currentData]);
    }
  }

  public deleteOne(id: string) {
    const currentData = this.data();
    const index = currentData.findIndex((v) => v.id === id);
    if (index !== -1) {
      currentData.splice(index, 1);
      this.data.set([...currentData]);
    }
  }
}
