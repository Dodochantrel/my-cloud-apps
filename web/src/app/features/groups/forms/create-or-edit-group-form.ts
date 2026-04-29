import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupRole } from '../../../core/models/groups/group-model';
import { editGroupMemberForm, EditGroupMemberForm } from './edit-group-member-form';
import { UserModel } from '../../../core/models/users/user-model';

export type CreateOrEditGroupFormModel = {
  id: FormControl<string | null>;
  name: FormControl<string>;
  members: FormArray<EditGroupMemberForm>;
};

export type CreateOrEditGroupForm = FormGroup<CreateOrEditGroupFormModel>;

export function createCreateOrEditGroupForm(user: UserModel | null): CreateOrEditGroupForm {
  const form =  new FormGroup<CreateOrEditGroupFormModel>({
    id: new FormControl(''),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    members: new FormArray<EditGroupMemberForm>([]),
  });

  if (user) {
    const memberForm = editGroupMemberForm();
    memberForm.controls.user.setValue(user);
    memberForm.controls.role.setValue(GroupRole.ADMIN);
    memberForm.controls.role.disable();
    
    form.controls.members.push(memberForm);
  }

  // Si un membre devient admin, les anciens admins deviennent membres.
  // Le rôle d'un admin est verrouillé pour ne pas pouvoir être changé.
  let previousRoles: GroupRole[] = [];

  form.controls.members.valueChanges.subscribe(() => {
    const memberControls = form.controls.members.controls;
    const currentRoles = memberControls.map((member) => member.controls.role.value);

    const promotedAdminIndex = currentRoles.findIndex(
      (role, index) => role === GroupRole.ADMIN && previousRoles[index] !== GroupRole.ADMIN,
    );

    if (promotedAdminIndex === -1) {
      previousRoles = [...currentRoles];
      return;
    }

    memberControls.forEach((member, index) => {
      if (index === promotedAdminIndex) {
        member.controls.role.disable({ emitEvent: false });
        return;
      }

      if (member.controls.role.value === GroupRole.ADMIN) {
        member.controls.role.setValue(GroupRole.MEMBER, { emitEvent: false });
        member.controls.role.enable({ emitEvent: false });
      }
    });

    previousRoles = memberControls.map((member) => member.controls.role.value);
  });

  return form;
}
