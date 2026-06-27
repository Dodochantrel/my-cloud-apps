import { FormControl, FormGroup, Validators } from '@angular/forms';

export type AddFileFormModel = {
  file: FormControl<File | null>;
  isPrivate: FormControl<boolean>;
};

export type AddFileForm = FormGroup<AddFileFormModel>;

export function createAddFileForm(): AddFileForm {
  const form =  new FormGroup<AddFileFormModel>({
    file: new FormControl<File | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    isPrivate: new FormControl(false, {
      nonNullable: true,
    }),
  });
  return form;
}

export function changeIsPrivate(form: AddFileForm, isPrivate: boolean): void {
  form.get('isPrivate')?.setValue(isPrivate);
}
