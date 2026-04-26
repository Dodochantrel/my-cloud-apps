import { Component, computed, model, output, ViewChild, signal } from '@angular/core';
import { FullCalendarModule, FullCalendarComponent } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { EventModel } from '../../../../core/models/events/event-model';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';

export type CalendarView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';

@Component({
  selector: 'app-event-calendar-component',
  imports: [CommonModule, FullCalendarModule, ButtonModule, ButtonGroupModule],
  templateUrl: './event-calendar-component.html',
  styleUrl: './event-calendar-component.css',
})
export class EventCalendarComponent {
  @ViewChild('calendar') calendarRef!: FullCalendarComponent;

  public events = model.required<EventModel[]>();
  public dayClicked = output<{ date: Date; dateStr: string }>();
  public eventClicked = output<EventModel>();

  protected currentView = signal<CalendarView>('dayGridMonth');
  protected currentTitle = signal<string>('');
  protected calendarEvents = computed<EventInput[]>(() =>
    this.events().map((event) => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
      color: event.color,
      extendedProps: {
        eventModel: event,
      },
    })),
  );

  protected calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: false,
    locale: 'fr',
    firstDay: 1,
    datesSet: (arg) => this.currentTitle.set(arg.view.title),
    dateClick: (arg) => this.onDateClick(arg),
    eventClick: (arg) => this.onEventClick(arg),
  };

  protected get viewLabels(): { value: CalendarView; label: string }[] {
    return [
      { value: 'dayGridMonth', label: 'Mois' },
      { value: 'timeGridWeek', label: 'Semaine' },
      { value: 'timeGridDay', label: 'Jour' },
    ];
  }

  protected changeView(view: CalendarView): void {
    this.currentView.set(view);
    this.calendarRef.getApi().changeView(view);
  }

  protected goToday(): void {
    this.calendarRef.getApi().today();
  }

  protected goPrev(): void {
    this.calendarRef.getApi().prev();
  }

  protected goNext(): void {
    this.calendarRef.getApi().next();
  }

  private onDateClick(arg: DateClickArg): void {
    this.dayClicked.emit({
      date: arg.date,
      dateStr: arg.dateStr,
    });
  }

  private onEventClick(arg: EventClickArg): void {
    const eventFromProps = arg.event.extendedProps['eventModel'] as EventModel | undefined;

    if (eventFromProps) {
      this.eventClicked.emit(eventFromProps);
      return;
    }

    const fallbackEvent = this.events().find((event) => event.id === arg.event.id);
    if (fallbackEvent) {
      this.eventClicked.emit(fallbackEvent);
    }
  }
}
