import { Component, inject, signal } from '@angular/core';
import { EventCalendarComponent } from '../../components/event-calendar-component/event-calendar-component';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { EventListService } from '../event-list-service';
import { DayDetailsPanelComponent } from '../../components/day-details-panel-component/day-details-panel-component';
import { EventStore } from '../../stores/event-store';
import { EventListFiltersComponent } from '../../components/event-list-filters-component/event-list-filters-component';
import { EventCategoryService } from '../../events-categories/event-category-service';
import { DividerModule } from 'primeng/divider';
import { TitleComponent } from '../../../../shared/components/title-component/title-component';
import { CreateOrEditEventComponent } from "../../components/create-or-edit-event/create-or-edit-event-component/create-or-edit-event-component";
import { EventModel } from '../../../../core/models/events/event-model';
import { NextEventsComponent } from '../../components/next-events-component/next-events-component';

@Component({
  selector: 'app-event-list-page',
  imports: [
    EventCalendarComponent,
    DefaultContainerComponent,
    DayDetailsPanelComponent,
    EventListFiltersComponent,
    DividerModule,
    TitleComponent,
    CreateOrEditEventComponent,
    NextEventsComponent
],
  templateUrl: './event-list-page.html',
  styleUrl: './event-list-page.css',
})
export class EventListPage {
  protected eventListService = inject(EventListService);
  protected eventCategoryService = inject(EventCategoryService);
  protected eventStore = inject(EventStore);

  public isDisplayDayDetails = signal(false);
  public selectedDate = signal<Date>(new Date());

  public isDisplayCreateOrEditEvent = signal(false);
  public selectedEvent = signal<EventModel | null>(null);
  public selectedDateForCreate = signal<Date | null>(null);

  handleCreateEvent(event: Date | null = null): void {
    this.selectedEvent.set(null);
    this.isDisplayCreateOrEditEvent.set(true);
    this.selectedDateForCreate.set(event);
  }

  onDayClicked(event: { date: Date; dateStr: string }): void {
    this.isDisplayDayDetails.set(true);
    this.selectedDate.set(event.date);
  }

  onEventClicked(event: EventModel): void {
    this.selectedEvent.set(event);
    this.isDisplayCreateOrEditEvent.set(true);
    this.selectedDateForCreate.set(null);
  }
}
