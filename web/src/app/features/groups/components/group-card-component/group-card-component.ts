import { Component, inject, model, output } from '@angular/core';
import { getGroupRoleIcon, GroupModel, GroupRole } from '../../../../core/models/groups/group-model';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { UserModel } from '../../../../core/models/users/user-model';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../core/auth/auth-service';

@Component({
  selector: 'app-group-card-component',
  imports: [
    TagModule,
    AvatarModule,
    DividerModule,
    AvatarGroupModule,
    MessageModule,
    ButtonModule,
  ],
  templateUrl: './group-card-component.html',
  styleUrl: './group-card-component.css',
})
export class GroupCardComponent {
  public group = model.required<GroupModel>();
  public onEdit = output<GroupModel>();
  public onDelete = output<GroupModel>();

  protected readonly authService = inject(AuthService);

  get userCountToDisplay(): string {
    const count = this.group().usersCount;
    return count === 1 ? '1 membre' : `${count} membres`;
  }

  get moderatorsToDisplay(): string {
    if (this.group().moderators.length === 0) {
      return 'Aucun modérateur';
    }
    // Tu renvois le fullName des modérateurs séparés par une virgule et si plus de 60 caractères, tu coupes et tu ajoutes "..."
    const moderatorsNames = this.group()
      .moderators.map((mod) => mod.fullName)
      .join(', ');
    return moderatorsNames.length > 60 ? moderatorsNames.slice(0, 60) + '...' : moderatorsNames;
  }

  get membersToDisplay(): UserModel[] {
    // revoyer les 5 premiers membres du groupe max
    return this.group().members.slice(0, 5);
  }

  get userConnectedIsAdmin(): boolean {
    // tu vérifies si l'utilisateur connecté est un admin du groupe
    const userConnected = this.authService.connectedUser();
    if (!userConnected) return false;
    return this.group().admin!.id === userConnected.id;
  }

  get userConnectedIsModerator(): boolean {
    // tu vérifies si l'utilisateur connecté est un modérateur du groupe
    const userConnected = this.authService.connectedUser();
    if (!userConnected) return false;
    return this.group().moderators.some((mod) => mod.id === userConnected.id);
  }

  get adminIcon(): string {
    return getGroupRoleIcon(GroupRole.ADMIN);
  }

  get moderatorIcon(): string {
    return getGroupRoleIcon(GroupRole.MODERATOR);
  }

  onEditClick() {
    this.onEdit.emit(this.group());
  }

  onDeleteClick() {
    this.onDelete.emit(this.group());
  }
}
