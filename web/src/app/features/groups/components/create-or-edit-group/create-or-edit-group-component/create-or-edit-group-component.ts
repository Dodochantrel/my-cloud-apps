import { NotificationService } from './../../../../../core/notification/notification-service';
import { Component, inject, input, linkedSignal, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogFormComponent } from '../../../../../shared/components/dialog-form-component/dialog-form-component';
import { createCreateOrEditGroupForm } from '../../../forms/create-or-edit-group-form';
import { editGroupMemberForm } from '../../../forms/edit-group-member-form';
import { updateFailedInputs } from '../../../../../shared/utils/update-failed-inputs';
import { InputTextComponent } from '../../../../../shared/components/inputs/input-text-component/input-text-component';
import { HeaderAutoCompleteComponent } from '../../../../../shared/components/header-auto-complete-component/header-auto-complete-component';
import { ButtonModule } from 'primeng/button';
import { CreateOrEditGroupService } from '../create-or-edit-group-service';
import { DividerModule } from 'primeng/divider';
import { UserModel } from '../../../../../core/models/users/user-model';
import { GroupRole, groupRolesOptions } from '../../../../../core/models/groups/group-model';
import { AvatarModule } from 'primeng/avatar';
import { InputSelectComponent } from '../../../../../shared/components/inputs/input-select-component/input-select-component';

@Component({
  selector: 'app-create-or-edit-group-component',
  imports: [
    ReactiveFormsModule,
    DialogFormComponent,
    InputTextComponent,
    HeaderAutoCompleteComponent,
    ButtonModule,
    DividerModule,
    AvatarModule,
    InputSelectComponent
  ],
  templateUrl: './create-or-edit-group-component.html',
  styleUrl: './create-or-edit-group-component.css',
})
export class CreateOrEditGroupComponent {
  public isDisplay = model.required<boolean>();
  public isCreating = input.required<boolean>();
  public groupRoles = groupRolesOptions;

  private readonly notificationService = inject(NotificationService);
  protected readonly createOrEditGroupService = inject(CreateOrEditGroupService);

  protected form = createCreateOrEditGroupForm();

  cancel() {
    this.form.reset();
    this.isDisplay.set(false);
  }

  save() {
    if (this.form.valid) {
      // Perform save operation
    } else {
      updateFailedInputs(this.form);
      this.notificationService.invalidForm();
    }
  }

  public users = linkedSignal(() => {
    return this.createOrEditGroupService.users().map((user) => ({
      label: user.firstName + ' ' + user.lastName,
      value: user,
    }));
  });

  public onSelectedUser(user: UserModel) {
    const memberForm = editGroupMemberForm();
    memberForm.controls.user.setValue(user);
    memberForm.controls.role.setValue(GroupRole.MEMBER);

    this.form.controls.members.push(memberForm);
  }

  get selectedUsers() {
    return this.form.controls.members.controls;
  }

  removeSelectedUser(index: number) {
    this.form.controls.members.removeAt(index);
  }
}
