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
