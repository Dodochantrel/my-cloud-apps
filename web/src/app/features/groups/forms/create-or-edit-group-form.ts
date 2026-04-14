import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditGroupMemberForm } from './edit-group-member-form';

export type CreateOrEditGroupFormModel = {
  id: FormControl<string | null>;
  name: FormControl<string>;
  members: FormArray<EditGroupMemberForm>;
};

export type CreateOrEditGroupForm = FormGroup<CreateOrEditGroupFormModel>;

export function createCreateOrEditGroupForm(): CreateOrEditGroupForm {
  return new FormGroup<CreateOrEditGroupFormModel>({
    id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    members: new FormArray<EditGroupMemberForm>([]),
  });
}
