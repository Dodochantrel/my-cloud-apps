import { EventModel } from '../../../models/events/event-model';
import { EventCategoryModel } from '../../../models/events/event-category-model';

export interface EventCategorySummaryDto {
  id: string;
  name: string;
  color: string;
}

export interface GetAllEventsResponseDto {
  id: string;
  title: string;
  allDay: boolean;
  start: string;
  end: string;
  category: EventCategorySummaryDto | null;
}

const mapCategorySummary = (
  dto: EventCategorySummaryDto | null,
): EventCategoryModel | null =>
  dto ? new EventCategoryModel(dto.id, dto.name, dto.color) : null;

export const mapFromGetAllEventsDtoToModel = (
  dto: GetAllEventsResponseDto,
): EventModel => {
  return new EventModel(
    dto.id,
    dto.allDay,
    new Date(dto.start),
    new Date(dto.end),
    dto.title,
    mapCategorySummary(dto.category),
  );
};

export const mapFromGetAllEventsDtosToModels = (
  dtos: GetAllEventsResponseDto[],
): EventModel[] => {
  return dtos.map(mapFromGetAllEventsDtoToModel);
};
