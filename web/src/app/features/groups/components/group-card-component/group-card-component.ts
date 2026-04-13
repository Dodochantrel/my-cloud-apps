import { Component, model } from '@angular/core';
import { GroupModel } from '../../../../core/models/groups/group-model';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { UserModel } from '../../../../core/models/users/user-model';

@Component({
  selector: 'app-group-card-component',
  imports: [TagModule, AvatarModule, DividerModule, AvatarGroupModule],
  templateUrl: './group-card-component.html',
  styleUrl: './group-card-component.css',
})
export class GroupCardComponent {
  public group = model.required<GroupModel>();

  get userCountToDisplay(): string {
    const count = this.group().usersCount;
    return count === 1 ? '1 membre' : `${count} membres`;
  }

  get moderatorsToDisplay(): string {
    if (this.group().moderators.length === 0) {
      return 'Aucun modérateur';
    }
    // Tu renvois le fullName des modérateurs séparés par une virgule et si plus de 60 caractères, tu coupes et tu ajoutes "..."
    const moderatorsNames = this.group().moderators.map((mod) => mod.fullName).join(', ');
    return moderatorsNames.length > 60 ? moderatorsNames.slice(0, 60) + '...' : moderatorsNames;
  }

  get membersToDisplay(): UserModel[] {
    // revoyer les 5 premiers membres du groupe max
    return this.group().members.slice(0, 5); 
  }
}
