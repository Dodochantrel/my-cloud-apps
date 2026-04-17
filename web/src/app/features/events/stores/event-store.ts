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
}