import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GalleryCategoryModel } from '../../../core/models/galleries/gallery-category-model';

export type AddFilesFormModel = {
  files: FormControl<File[]>;
  isPrivate: FormControl<boolean>;
  category: FormControl<GalleryCategoryModel | null>;
};

export type AddFilesForm = FormGroup<AddFilesFormModel>;

export function createAddFilesForm(): AddFilesForm {
  const form =  new FormGroup<AddFilesFormModel>({
    files: new FormControl([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    isPrivate: new FormControl(false, {
      nonNullable: true,
    }),
    category: new FormControl<GalleryCategoryModel | null>(null, {
      validators: [Validators.required],
    }),
  });
  return form;
}

export function changePrivacy(form: AddFilesForm, isPrivate: boolean): void {
  form.get('isPrivate')?.setValue(isPrivate);
}
