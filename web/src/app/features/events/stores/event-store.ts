import { Injectable } from "@angular/core";
import { StoreUtils } from "../../../shared/utils/store-utils";
import { EventModel } from "../../../core/models/events/event-model";

@Injectable({
  providedIn: 'root',
})
export class EventStore extends StoreUtils<EventModel> {
  findByDate(date: Date): EventModel[] {
    const targetTime = new Date(date).getTime();

    return this.data().filter((event) => {
      const startTime = new Date(event.start).getTime();
      const endTime = new Date(event.end).getTime();

      return !Number.isNaN(startTime)
        && !Number.isNaN(endTime)
        && targetTime >= startTime
        && targetTime <= endTime;
    });
  }

  getNextEvents(count: number = 5): EventModel[] {
    const now = new Date().getTime();

    return this.data()
      .filter((event) => {
        const startTime = new Date(event.start).getTime();
        const endTime = new Date(event.end).getTime();

        return !Number.isNaN(startTime)
          && !Number.isNaN(endTime)
          && endTime >= now;
      })
      .sort((a, b) => {
        const aStart = new Date(a.start).getTime();
        const bStart = new Date(b.start).getTime();
        return aStart - bStart;
      })
      .slice(0, count);
  }
}