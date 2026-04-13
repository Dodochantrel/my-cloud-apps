export interface AddUsersToGroupRequestDto {
  userIds: string[];
}

export interface AddUsersToGroupResponseDto {
  id: string;
  name: string;
  usersCount: number;
}
