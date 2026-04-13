import { Component, inject, signal } from '@angular/core';
import { EventCalendarComponent } from '../../components/event-calendar-component/event-calendar-component';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { EventListService } from '../event-list-service';

@Component({
  selector: 'app-event-list-page',
  imports: [EventCalendarComponent, DefaultContainerComponent],
  templateUrl: './event-list-page.html',
  styleUrl: './event-list-page.css',
})
export class EventListPage {
  protected eventListService = inject(EventListService);

  onDayClicked(event: { date: Date; dateStr: string }): void {
    console.log('Day clicked:', event);
  }

  onEventClicked(event: any): void {
    console.log('Event clicked:', event);
  }
}
