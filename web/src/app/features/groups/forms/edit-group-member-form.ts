import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupRole } from '../../../core/models/groups/group-model';
import { UserModel } from '../../../core/models/users/user-model';

export type EditGroupMemberFormModel = {
  user: FormControl<UserModel | null>;
  role: FormControl<GroupRole>;
};

export type EditGroupMemberForm = FormGroup<EditGroupMemberFormModel>;

export function editGroupMemberForm(): EditGroupMemberForm {
  return new FormGroup<EditGroupMemberFormModel>({
    user: new FormControl<UserModel | null>(null, {
      validators: [Validators.required],
    }),
    role: new FormControl(GroupRole.MEMBER, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}
