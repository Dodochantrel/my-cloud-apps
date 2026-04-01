import { FormControl, FormGroup, Validators } from '@angular/forms';

export type CreateOrEditEventFormModel = {
  id: FormControl<string | null>;
};

export type CreateOrEditEventForm = FormGroup<CreateOrEditEventFormModel>;

export function createCreateOrEditEventForm(): CreateOrEditEventForm {
  return new FormGroup<CreateOrEditEventFormModel>({
    id: new FormControl('', {
      nonNullable: false,
    }),
  });
}
