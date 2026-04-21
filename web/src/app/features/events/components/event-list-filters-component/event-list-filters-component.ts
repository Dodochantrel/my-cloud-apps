import { Component, inject, linkedSignal, model, output } from '@angular/core';
import { InputAutoCompleteComponent } from '../../../../shared/components/inputs/input-auto-complete-component/input-auto-complete-component';
import { EventListFiltersService } from './event-list-filters-service';
import { EventCategoryModel } from '../../../../core/models/events/event-category-model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-event-list-filters-component',
  imports: [InputAutoCompleteComponent, ButtonModule],
  templateUrl: './event-list-filters-component.html',
  styleUrl: './event-list-filters-component.css',
})
export class EventListFiltersComponent {
  public search = model.required<string>();
  public startDate = model.required<Date>();
  public endDate = model.required<Date>();
  public onCategoryChange = output<EventCategoryModel>();
  public onClickCreateEvent = output<void>();

  protected readonly eventListFiltersService = inject(EventListFiltersService);

  onSearchChange(value: string) {
    this.eventListFiltersService.search.set(value);
  }

  public events = linkedSignal(() => {
    return this.eventListFiltersService.events()
      .map((event) => ({
        label: event.title,
        value: event,
      }));
  });
}
