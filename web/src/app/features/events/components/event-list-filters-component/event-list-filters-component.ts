import { Component, model } from '@angular/core';

@Component({
  selector: 'app-event-list-filters-component',
  imports: [],
  templateUrl: './event-list-filters-component.html',
  styleUrl: './event-list-filters-component.css',
})
export class EventListFiltersComponent {
  public search = model.required<string>();
  public startDate = model.required<Date>();
  public endDate = model.required<Date>();
}
