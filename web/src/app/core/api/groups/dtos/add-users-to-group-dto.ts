import { GroupRole } from '../../../models/groups/group-model';

export interface AddUserToGroupItemDto {
  userId: string;
  role: GroupRole;
}

export interface AddUsersToGroupRequestDto {
  users: AddUserToGroupItemDto[];
}

export interface AddUsersToGroupResponseDto {
  id: string;
  name: string;
  usersCount: number;
}
