import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GalleryCategoryModel } from '../../../core/models/galleries/gallery-category-model';
import { AddFileForm } from './add-file-form';

export type AddFilesFormModel = {
  files: FormArray<AddFileForm>;
  category: FormControl<GalleryCategoryModel | null>;
};

export type AddFilesForm = FormGroup<AddFilesFormModel>;

export function createAddFilesForm(): AddFilesForm {
  const form =  new FormGroup<AddFilesFormModel>({
    files: new FormArray<AddFileForm>([]),
    category: new FormControl<GalleryCategoryModel | null>(null, {
      validators: [Validators.required],
    }),
  });
  return form;
}

export function changePrivacy(form: AddFilesForm, isPrivate: boolean): void {
  form.controls.files.controls.forEach((fileForm) => {
    fileForm.controls.isPrivate.setValue(isPrivate);
  });
}
