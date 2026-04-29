import { GroupModel } from '../../../models/groups/group-model';
import { UserModel } from '../../../models/users/user-model';
import { AddUserToGroupItemDto } from './add-users-to-group-dto';
import { GroupUserSummaryDto } from './get-all-groups-dto';

export interface CreateGroupRequestDto {
  name: string;
  users?: AddUserToGroupItemDto[];
}

export interface CreateGroupResponseDto {
  id: string;
  name: string;
  admin: GroupUserSummaryDto;
  moderators: GroupUserSummaryDto[];
  members: GroupUserSummaryDto[];
}

const mapUserSummary = (dto: GroupUserSummaryDto): UserModel =>
  new UserModel(dto.id, dto.firstName, dto.lastName, '');

export const mapFromCreateGroupDtoToGroupModel = (
  dto: CreateGroupResponseDto,
): GroupModel => {
  const model = new GroupModel(dto.id, dto.name);
  model.admin = mapUserSummary(dto.admin);
  model.moderators = dto.moderators.map(mapUserSummary);
  model.members = dto.members.map(mapUserSummary);
  return model;
};
