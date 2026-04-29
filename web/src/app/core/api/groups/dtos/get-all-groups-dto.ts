import { GroupModel } from '../../../models/groups/group-model';
import { UserModel } from '../../../models/users/user-model';

export interface GroupUserSummaryDto {
  id: string;
  firstName: string;
  lastName: string;
}

export interface GetAllGroupsResponseDto {
  id: string;
  name: string;
  admin: GroupUserSummaryDto;
  moderators: GroupUserSummaryDto[];
  users: GroupUserSummaryDto[];
}

const mapUserSummary = (dto: GroupUserSummaryDto): UserModel =>
  new UserModel(dto.id, dto.firstName, dto.lastName, '');

export const mapFromGetAllGroupsDtoToGroupModel = (
  dto: GetAllGroupsResponseDto,
): GroupModel => {
  const model = new GroupModel(dto.id, dto.name);
  model.admin = mapUserSummary(dto.admin);
  model.moderators = dto.moderators.map(mapUserSummary);
  model.members = dto.users.map(mapUserSummary);
  return model;
};

export const mapFromGetAllGroupsDtosToGroupModels = (
  dtos: GetAllGroupsResponseDto[],
): GroupModel[] => {
  return dtos.map((dto) => mapFromGetAllGroupsDtoToGroupModel(dto));
};
