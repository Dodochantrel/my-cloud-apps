import { Component, model, output } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventModel } from '../../../../core/models/events/event-model';

@Component({
  selector: 'app-event-calendar-component',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './event-calendar-component.html',
  styleUrl: './event-calendar-component.css',
})
export class EventCalendarComponent {
  public events = model.required<EventModel[]>();
  public dayClicked = output<{ date: Date; dateStr: string }>();
  public eventClicked = output<EventClickArg>();

  protected calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    headerToolbar: false,
    locale: 'fr',
    firstDay: 1,
    dateClick: (arg) => this.onDateClick(arg),
    eventClick: (arg) => this.onEventClick(arg),
  };

  private onDateClick(arg: DateClickArg): void {
    this.dayClicked.emit({
      date: arg.date,
      dateStr: arg.dateStr,
    });
  }

  private onEventClick(arg: EventClickArg): void {
    this.eventClicked.emit(arg);
  }
}
