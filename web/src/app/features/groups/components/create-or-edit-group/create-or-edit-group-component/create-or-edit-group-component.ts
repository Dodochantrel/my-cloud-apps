import { Component, effect, inject, input, linkedSignal, model, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogFormComponent } from '../../../../../shared/components/dialog-form-component/dialog-form-component';
import { createCreateOrEditGroupForm } from '../../../forms/create-or-edit-group-form';
import { editGroupMemberForm } from '../../../forms/edit-group-member-form';
import { InputTextComponent } from '../../../../../shared/components/inputs/input-text-component/input-text-component';
import { ButtonModule } from 'primeng/button';
import { CreateOrEditGroupService } from '../create-or-edit-group-service';
import { DividerModule } from 'primeng/divider';
import { UserModel } from '../../../../../core/models/users/user-model';
import { getGroupRoleIcon, GroupModel, GroupRole, groupRolesOptions } from '../../../../../core/models/groups/group-model';
import { AvatarModule } from 'primeng/avatar';
import { InputSelectComponent } from '../../../../../shared/components/inputs/input-select-component/input-select-component';
import { AuthService } from '../../../../../core/auth/auth-service';
import { InputAutoCompleteComponent } from '../../../../../shared/components/inputs/input-auto-complete-component/input-auto-complete-component';

@Component({
  selector: 'app-create-or-edit-group-component',
  imports: [
    ReactiveFormsModule,
    DialogFormComponent,
    InputTextComponent,
    InputAutoCompleteComponent,
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
  public groupToEdit = model.required<GroupModel | null>();
  public groupRoles = groupRolesOptions;

  protected readonly createOrEditGroupService = inject(CreateOrEditGroupService);
  protected readonly authService = inject(AuthService);

  protected form = createCreateOrEditGroupForm(this.authService.connectedUser());

  constructor() {
    effect(() => {
      if (this.isDisplay()) { 
        this.form = createCreateOrEditGroupForm(this.authService.connectedUser());
        this.updateSelectedUserIds();
      }

      if (this.groupToEdit()) {
        this.form.controls.id.setValue(this.groupToEdit()!.id);
        this.form.controls.name.setValue(this.groupToEdit()!.name);
        this.groupToEdit()!.members.forEach((member) => {
          const memberForm = editGroupMemberForm();
          memberForm.controls.user.setValue(member);
          memberForm.controls.role.setValue(
            member.id === this.groupToEdit()!.admin!.id
              ? GroupRole.ADMIN
              : this.groupToEdit()!.moderators.some((m) => m.id === member.id)
                ? GroupRole.MODERATOR
                : GroupRole.MEMBER,
          );
          if (member.id === this.groupToEdit()!.admin!.id) {
            memberForm.controls.role.disable();
          }
          this.form.controls.members.push(memberForm);
        });
        this.updateSelectedUserIds();
      }
    });
  }

  cancel() {
    this.form.reset();
    this.isDisplay.set(false);
  }

  save() {
    const members = this.form.controls.members.controls.map((member) => ({
      userId: member.controls.user.value!.id,
      role: member.controls.role.value,
    }));

    if (this.form.value.id) {
      this.createOrEditGroupService.editGroup(
        this.form.value.id!,
        this.form.value.name!,
        members,
      ).subscribe({
        next: () => {
          this.cancel();
        },
      });
    } else {
      this.createOrEditGroupService.createGroup(
        this.form.value.name!,
        members,
      ).subscribe({
        next: () => {
          this.cancel();
        },
      });
    }
  }

  private selectedUserIds = signal<Set<string>>(new Set());

  public users = linkedSignal(() => {
    const selectedIds = this.selectedUserIds();
    return this.createOrEditGroupService.users()
      .filter((user) => !selectedIds.has(user.id))
      .map((user) => ({
        label: user.firstName + ' ' + user.lastName,
        value: user,
      }));
  });

  public onSelectedUser(user: UserModel) {
    const memberForm = editGroupMemberForm();
    memberForm.controls.user.setValue(user);
    memberForm.controls.role.setValue(GroupRole.MEMBER);

    this.form.controls.members.push(memberForm);
    this.updateSelectedUserIds();
  }

  get selectedUsers() {
    return this.form.controls.members.controls;
  }

  removeSelectedUser(index: number) {
    this.form.controls.members.removeAt(index);
    this.updateSelectedUserIds();
  }

  getIconForSelect(index: number): string {
    return getGroupRoleIcon(this.form.controls.members.controls[index].controls.role.value);
  }

  private updateSelectedUserIds() {
    const ids = new Set<string>(
      this.form.controls.members.controls
        .map((member) => member.controls.user.value?.id)
        .filter((id): id is string => !!id),
    );
    this.selectedUserIds.set(ids);
  }
}
