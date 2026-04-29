import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventCategoryModel } from '../../../core/models/events/event-category-model';
import { GroupModel } from '../../../core/models/groups/group-model';

export type CreateOrEditEventFormModel = {
  id: FormControl<string | null>;
  category: FormControl<EventCategoryModel | null>;
  groups: FormControl<GroupModel[] | null>;
  title: FormControl<string>;
  allDay: FormControl<boolean>;
  dates: FormControl<Date[] | Date>;
  startHours: FormControl<Date>;
  endHours: FormControl<Date>;
};

export type CreateOrEditEventForm = FormGroup<CreateOrEditEventFormModel>;

export function createCreateOrEditEventForm(): CreateOrEditEventForm {
  const form = new FormGroup<CreateOrEditEventFormModel>({
    id: new FormControl('', {
      nonNullable: false,
    }),
    category: new FormControl<EventCategoryModel | null>(null, {
      validators: [Validators.required],
      nonNullable: false,
    }),
    groups: new FormControl<GroupModel[] | null>(null, {
      nonNullable: false,
    }),
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    allDay: new FormControl(false, {
      nonNullable: true,
    }),
    dates: new FormControl<Date[] | Date>([new Date(), new Date()], {
      validators: [Validators.required],
      nonNullable: true,
    }),
    startHours: new FormControl(new Date(), {
      validators: [],
      nonNullable: true,
    }),
    endHours: new FormControl(new Date(), {
      validators: [],
      nonNullable: true,
    }),
  });

  const updateHoursRequiredValidators = (isAllDay: boolean) => {
    const validators = isAllDay
      ? []
      : [Validators.required];

    form.controls.startHours.setValidators(validators);
    form.controls.endHours.setValidators(validators);
    form.controls.startHours.updateValueAndValidity({ emitEvent: false });
    form.controls.endHours.updateValueAndValidity({ emitEvent: false });
  };

  // État initial des validateurs d'heures
  updateHoursRequiredValidators(form.controls.allDay.value);

  // Quand allDay = true => mode single (Date)
  // Quand allDay = false => mode range (Date[])
  form.controls.allDay.valueChanges.subscribe((isAllDay: boolean) => {
    updateHoursRequiredValidators(isAllDay);

    const dates = form.controls.dates.value;

    if (isAllDay) {
      const firstDate = Array.isArray(dates) ? dates[0] : dates;
      form.controls.dates.setValue(firstDate ? new Date(firstDate) : new Date(), { emitEvent: false });
    } else {
      const date = Array.isArray(dates) ? dates[0] : dates;
      const start = date ? new Date(date) : new Date();
      const end = new Date(start);
      form.controls.dates.setValue([start, end], { emitEvent: false });
    }
  });

  return form;
}