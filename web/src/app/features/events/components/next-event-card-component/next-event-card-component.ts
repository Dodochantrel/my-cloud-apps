import { Component, model, output, signal } from '@angular/core';
import { EventModel } from '../../../../core/models/events/event-model';
import { CommonModule } from '@angular/common';
import { CreateOrEditEventComponent } from '../create-or-edit-event/create-or-edit-event-component/create-or-edit-event-component';

@Component({
  selector: 'app-next-event-card-component',
  imports: [CommonModule, CreateOrEditEventComponent],
  templateUrl: './next-event-card-component.html',
  styleUrl: './next-event-card-component.css',
})
export class NextEventCardComponent {
  public event = model.required<EventModel>();

  public isCreateOrEditEventDisplay = signal<boolean>(false);

  get eventIsToday(): boolean {
    const today = new Date();
    const eventDate = new Date(this.event().start);
    return (
      today.getFullYear() === eventDate.getFullYear() &&
      today.getMonth() === eventDate.getMonth() &&
      today.getDate() === eventDate.getDate()
    );
  }

  get fullDate(): string {
    if (this.event().allDay) {
      // Retourner la date au format "DD/MM/YYYY"
      const eventDate = new Date(this.event().start);
      const day = String(eventDate.getDate()).padStart(2, '0');
      const month = String(eventDate.getMonth() + 1).padStart(2, '0');
      const year = eventDate.getFullYear();
      return `${day}/${month}/${year}`;
    } else {
      // Retourner la date de début au format "DD/MM/YYYY HH:mm" et la date de fin au format "DD/MM/YYYY HH:mm"
      const startDate = new Date(this.event().start);
      const endDate = new Date(this.event().end);
      const startDay = String(startDate.getDate()).padStart(2, '0');
      const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
      const startYear = startDate.getFullYear();
      const startHours = String(startDate.getHours()).padStart(2, '0');
      const startMinutes = String(startDate.getMinutes()).padStart(2, '0');
      const endDay = String(endDate.getDate()).padStart(2, '0');
      const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
      const endYear = endDate.getFullYear();
      const endHours = String(endDate.getHours()).padStart(2, '0');
      const endMinutes = String(endDate.getMinutes()).padStart(2, '0');

      const isSameDay =
        startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getDate() === endDate.getDate();

      if (isSameDay) {
        return `${startDay}/${startMonth}/${startYear} ${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
      }

      return `${startDay}/${startMonth}/${startYear} ${startHours}:${startMinutes} - ${endDay}/${endMonth}/${endYear} ${endHours}:${endMinutes}`;
    }
  }

  onEventClick() {
    this.isCreateOrEditEventDisplay.set(true);
  }
}
