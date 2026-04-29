import { Component, inject } from '@angular/core';
import { EventStore } from '../../stores/event-store';
import { NextEventCardComponent } from '../next-event-card-component/next-event-card-component';

@Component({
  selector: 'app-next-events-component',
  imports: [NextEventCardComponent],
  templateUrl: './next-events-component.html',
  styleUrl: './next-events-component.css',
})
export class NextEventsComponent {
  protected eventStore = inject(EventStore);
}
