import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GalleryCategoryModel } from '../../../core/models/galleries/gallery-category-model';
import { GroupModel } from '../../../core/models/groups/group-model';

export type CreateOrEditGalleryCategoryFormModel = {
  id: FormControl<string | null>;
  name: FormControl<string>;
  parent: FormControl<GalleryCategoryModel | null>;
  groups: FormControl<GroupModel[] | null>;
};

export type CreateOrEditGalleryCategoryForm = FormGroup<CreateOrEditGalleryCategoryFormModel>;

export function createCreateOrEditGalleryCategoryForm(): CreateOrEditGalleryCategoryForm {
  const form = new FormGroup<CreateOrEditGalleryCategoryFormModel>({
    id: new FormControl(''),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    parent: new FormControl<GalleryCategoryModel | null>(null),
    groups: new FormControl<GroupModel[] | null>(null),
  });
  return form;
}
