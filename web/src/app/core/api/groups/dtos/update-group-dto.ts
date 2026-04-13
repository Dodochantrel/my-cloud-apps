import { GroupModel } from '../../../models/groups/group-model';

export interface UpdateGroupRequestDto {
  name?: string;
}

export interface UpdateGroupResponseDto {
  id: string;
  name: string;
}

export const mapFromUpdateGroupDtoToGroupModel = (
  dto: UpdateGroupResponseDto,
): GroupModel => {
  return new GroupModel(dto.id, dto.name);
};
