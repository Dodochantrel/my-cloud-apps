import { Component, inject, signal } from '@angular/core';
import { EventCalendarComponent } from '../../components/event-calendar-component/event-calendar-component';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { EventListService } from '../event-list-service';
import { DayDetailsPanelComponent } from '../../components/day-details-panel-component/day-details-panel-component';
import { EventStore } from '../../stores/event-store';
import { EventListFiltersComponent } from '../../components/event-list-filters-component/event-list-filters-component';

@Component({
  selector: 'app-event-list-page',
  imports: [EventCalendarComponent, DefaultContainerComponent, DayDetailsPanelComponent, EventListFiltersComponent],
  templateUrl: './event-list-page.html',
  styleUrl: './event-list-page.css',
})
export class EventListPage {
  protected eventListService = inject(EventListService);
  protected eventStore = inject(EventStore);

  public isDisplayDayDetails = signal(true);
  public selectedDate = signal(new Date());

  onDayClicked(event: { date: Date; dateStr: string }): void {
    this.isDisplayDayDetails.set(true);
    this.selectedDate.set(event.date);
  }

  onEventClicked(event: any): void {
    console.log('Event clicked:', event);
  }
}
