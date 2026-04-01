import { Component } from '@angular/core';
import { EventCalendarComponent } from '../../components/event-calendar-component/event-calendar-component';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';

@Component({
  selector: 'app-event-list-page',
  imports: [EventCalendarComponent, DefaultContainerComponent],
  templateUrl: './event-list-page.html',
  styleUrl: './event-list-page.css',
})
export class EventListPage {

}
