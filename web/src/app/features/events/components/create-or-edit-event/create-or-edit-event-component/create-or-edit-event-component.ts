import { Component, inject, linkedSignal, model } from '@angular/core';
import { CreateOrEditEventService } from '../create-or-edit-event-service';
import { DialogFormComponent } from '../../../../../shared/components/dialog-form-component/dialog-form-component';
import { EventModel } from '../../../../../core/models/events/event-model';
import { createCreateOrEditEventForm } from '../../../forms/create-or-edit-event-form';
import { InputTextComponent } from '../../../../../shared/components/inputs/input-text-component/input-text-component';
import { InputToggleSwitchComponent } from '../../../../../shared/components/inputs/input-toggle-switch-component/input-toggle-switch-component';
import { InputDateComponent } from '../../../../../shared/components/inputs/input-date-component/input-date-component';
import { EventCategoryService } from '../../../events-categories/event-category-service';
import { GroupStore } from '../../../../groups/stores/group-store';
import { InputMultiSelectComponent } from '../../../../../shared/components/inputs/input-multi-select-component/input-multi-select-component';
import { InputSelectComponent } from '../../../../../shared/components/inputs/input-select-component/input-select-component';

@Component({
  selector: 'app-create-or-edit-event-component',
  imports: [
    DialogFormComponent,
    InputTextComponent,
    InputToggleSwitchComponent,
    InputDateComponent,
    InputMultiSelectComponent,
    InputSelectComponent
  ],
  templateUrl: './create-or-edit-event-component.html',
  styleUrl: './create-or-edit-event-component.css',
})
export class CreateOrEditEventComponent {
  public createOrEditEventService = inject(CreateOrEditEventService);
  public groupStore = inject(GroupStore);

  public eventToEdit = model<EventModel | null>();
  public isDisplay = model.required<boolean>();
  public choosedDate = model<Date | null>();

  public form = createCreateOrEditEventForm();

  protected eventsCategoriesService = inject(EventCategoryService);

  get isAllDay(): boolean {
    return this.form.get('allDay')?.value!;
  }

  cancel() {
    this.eventToEdit.set(null);
    this.isDisplay.set(false);
    this.choosedDate.set(null);
  }

  save() {
    if (this.form.value.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  create() {
    const dates = this.prepareStartAndEndDate();
    this.createOrEditEventService
      .create(
        this.form.get('title')?.value!,
        this.form.get('allDay')?.value!,
        dates.start,
        dates.end,
        this.form.get('category')?.value!.id!,
        this.form.get('groups')?.value.map(group => group.id)!,
      )
      .subscribe({
        next: () => {
          this.isDisplay.set(false);
        },
      });
  }

  edit() {
    const dates = this.prepareStartAndEndDate();
    this.createOrEditEventService
      .edit(
        this.form.get('id')?.value!,
        this.form.get('title')?.value!,
        this.form.get('allDay')?.value!,
        dates.start,
        dates.end,
        this.form.get('category')?.value!.id!,
        this.form.get('groups')?.value.map(group => group.id)!,
      )
      .subscribe({
        next: () => {
          this.isDisplay.set(false);
        },
      });
  }

  prepareStartAndEndDate(): { start: Date; end: Date } {
    const dates = this.form.get('dates')?.value! as Date | Date[];

    if (this.isAllDay) {
      const day = Array.isArray(dates) ? dates[0] : dates;
      const start = new Date(day);
      const end = new Date(day);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    }

    const datesArray = dates as Date[];
    return { start: datesArray[0], end: datesArray[1] };
  }

  onSearchGroupChange(search: string) {
    this.createOrEditEventService.searchGroup.set(search);
  }

  public categories = linkedSignal(() => {
    return this.eventsCategoriesService.events().map((event) => ({
      label: event.name,
      value: event,
    }));
  });

  public groups = linkedSignal(() => {
    return this.groupStore.data().map((group) => ({
      label: group.name,
      value: group,
    }));
  });
}
