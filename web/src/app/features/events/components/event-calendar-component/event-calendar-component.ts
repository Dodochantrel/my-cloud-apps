import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-event-calendar-component',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './event-calendar-component.html',
  styleUrl: './event-calendar-component.css',
})
export class EventCalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };
}
