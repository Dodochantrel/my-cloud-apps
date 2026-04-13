import { Injectable, signal } from '@angular/core';
import { EventModel } from '../../../core/models/events/event-model';

@Injectable({
  providedIn: 'root',
})
export class EventListService {
  events = signal([
    new EventModel(
      'Event 1',
      true,
      new Date('2026-04-11'),
      new Date('2026-04-11'),
      'Description for Event 1'
    ),
  ])
}
