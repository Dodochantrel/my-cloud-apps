import { EventModel } from '../../../models/events/event-model';
import { EventCategorySummaryDto, mapCategorySummary } from './event-category-summary-dto';
import { GroupSummaryDto, mapFromGroupSummaryDtos } from './group-summary-dto';

export interface GetAllEventsResponseDto {
  id: string;
  title: string;
  allDay: boolean;
  start: string;
  end: string;
  category: EventCategorySummaryDto | null;
  groups: GroupSummaryDto[];
}

export const mapFromGetAllEventsDtoToModel = (dto: GetAllEventsResponseDto): EventModel => {
  const event = new EventModel(
    dto.id,
    dto.allDay,
    new Date(dto.start),
    new Date(dto.end),
    dto.title,
    mapCategorySummary(dto.category),
  );
  event.groups = mapFromGroupSummaryDtos(dto.groups);
  return event;
};

export const mapFromGetAllEventsDtosToModels = (dtos: GetAllEventsResponseDto[]): EventModel[] => {
  return dtos.map(mapFromGetAllEventsDtoToModel);
};
