import { GroupModel } from "../../../models/groups/group-model";

export interface GroupSummaryDto {
  id: string;
  name: string;
}

export const mapFromGroupSummaryDto = (dto: GroupSummaryDto): GroupModel | null => 
    dto ? new GroupModel(dto.id, dto.name) : null;

export const mapFromGroupSummaryDtos = (dtos: GroupSummaryDto[]): GroupModel[] =>
  dtos.map(mapFromGroupSummaryDto).filter((model): model is GroupModel => model !== null);