import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupRole } from '../../../core/models/groups/group-model';

export type EditGroupMemberFormModel = {
  id: FormControl<string>;
  role: FormControl<GroupRole>;
};

export type EditGroupMemberForm = FormGroup<EditGroupMemberFormModel>;

export function editGroupMemberForm(): EditGroupMemberForm {
  return new FormGroup<EditGroupMemberFormModel>({
    id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    role: new FormControl(GroupRole.MEMBER, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}
