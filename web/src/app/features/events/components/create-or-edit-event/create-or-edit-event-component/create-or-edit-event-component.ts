import { Component, effect, inject, input, linkedSignal, model } from '@angular/core';
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
import { GroupModel } from '../../../../../core/models/groups/group-model';

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

  public eventToEdit = input<EventModel | null>(null);
  public isDisplay = model.required<boolean>();
  public choosedDate = model<Date | null>();

  public form = createCreateOrEditEventForm();

  private readonly syncFormWithEventToEdit = effect(() => {
    if (!this.isDisplay()) {
      return;
    }

    const event = this.eventToEdit();

    if (!event) {
      return;
    }

    const start = new Date(event.start);
    const end = new Date(event.end);
    const dates = event.allDay ? start : [start, end];
    const groups = (event as EventModel & { groups?: GroupModel[] }).groups ?? [];

    this.form.patchValue(
      {
        id: event.id,
        title: event.title,
        allDay: event.allDay,
        category: event.category,
        groups,
        dates,
      },
      { emitEvent: false },
    );
  });

  private readonly resetFormWhenDialogIsClosed = effect(() => {
    if (this.isDisplay()) {
      return;
    }

    this.form.reset(
      {
        id: '',
        category: null,
        groups: [],
        title: '',
        allDay: false,
        dates: [new Date(), new Date()],
      },
      { emitEvent: false },
    );
  });

  protected eventsCategoriesService = inject(EventCategoryService);

  get isAllDay(): boolean {
    return this.form.get('allDay')?.value!;
  }

  cancel() {
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

    const datesArray = Array.isArray(dates) ? dates : [dates];
    const start = datesArray[0] ? new Date(datesArray[0]) : new Date();
    const end = datesArray[1] ? new Date(datesArray[1]) : new Date(start);

    return { start, end };
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
