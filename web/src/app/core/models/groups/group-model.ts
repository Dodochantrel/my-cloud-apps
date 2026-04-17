import { UserModel } from "../users/user-model";

export class GroupModel {
    id: string;
    name: string;
    members: UserModel[] = [];
    moderators: UserModel[] = [];
    admin: UserModel | null = null;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    get usersCount(): number {
        return this.members.length + this.moderators.length + (this.admin ? 1 : 0);
    }
}

export enum GroupRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member',
} 

export const groupRolesOptions: { label: string, value: GroupRole }[] = [
  { label: 'Admin', value: GroupRole.ADMIN },
  { label: 'Modérateur', value: GroupRole.MODERATOR },
  { label: 'Membre', value: GroupRole.MEMBER },
];

export const getGroupRoleIcon = (role: GroupRole): string => {
  switch (role) {
    case GroupRole.ADMIN:
      return 'shield_person';
    case GroupRole.MODERATOR:
      return 'health_and_safety';
    case GroupRole.MEMBER:
      return 'person';
    default:
      return '';
  }
};