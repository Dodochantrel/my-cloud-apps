import { Component, effect, inject, model, output, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { EventStore } from '../../stores/event-store';
import { EventModel } from '../../../../core/models/events/event-model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TitleComponent } from '../../../../shared/components/title-component/title-component';

@Component({
  selector: 'app-day-details-panel-component',
  imports: [DrawerModule, CommonModule, ButtonModule, TitleComponent],
  templateUrl: './day-details-panel-component.html',
  styleUrl: './day-details-panel-component.css',
})
export class DayDetailsPanelComponent {
  public isVisible = model.required<boolean>();
  public date = model.required<Date>();

  onCreatedDate = output<Date>();

  protected eventStore = inject(EventStore);

  protected events = signal<EventModel[]>([]);

  constructor() {
    effect(() => {
      if(this.date()) {
        this.events.set(this.eventStore.findByDate(this.date()));
      }
    });
  }

  onPreviousDate(): void {
    const previousDate = new Date(this.date());
    previousDate.setDate(previousDate.getDate() - 1);
    this.date.set(previousDate);
  }

  onNextDate(): void {
    const nextDate = new Date(this.date());
    nextDate.setDate(nextDate.getDate() + 1);
    this.date.set(nextDate);
  }

  onAddEvent(): void {
    this.onCreatedDate.emit(this.date());
  }
}
