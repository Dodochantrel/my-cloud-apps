import { GroupModel } from '../../../models/groups/group-model';

export interface CreateGroupRequestDto {
  name: string;
}

export interface CreateGroupResponseDto {
  id: string;
  name: string;
}

export const mapFromCreateGroupDtoToGroupModel = (
  dto: CreateGroupResponseDto,
): GroupModel => {
  return new GroupModel(dto.id, dto.name);
};
