import { Component, model } from '@angular/core';
import { EventModel } from '../../../../core/models/events/event-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-next-event-card-component',
  imports: [CommonModule],
  templateUrl: './next-event-card-component.html',
  styleUrl: './next-event-card-component.css',
})
export class NextEventCardComponent {
  public event = model.required<EventModel>();
}
