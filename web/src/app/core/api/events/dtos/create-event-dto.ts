import { EventModel } from '../../../models/events/event-model';
import { EventCategoryModel } from '../../../models/events/event-category-model';
import { EventCategorySummaryDto, mapCategorySummary } from './event-category-summary-dto';
import { GroupSummaryDto, mapFromGroupSummaryDtos } from './group-summary-dto';

export interface CreateEventRequestDto {
  title: string;
  allDay: boolean;
  start: string;
  end: string;
  categoryId?: string;
  groupsId: string[];
}

export interface CreateEventResponseDto {
  id: string;
  title: string;
  allDay: boolean;
  start: string;
  end: string;
  category: EventCategorySummaryDto | null;
  groups: GroupSummaryDto[];
}

export const mapFromCreateEventDtoToModel = (
  dto: CreateEventResponseDto,
): EventModel => {
  const event = new EventModel(
    dto.id,
    dto.allDay,
    new Date(dto.start),
    new Date(dto.end),
    dto.title,
    dto.category ? mapCategorySummary(dto.category) : null,
  );
  event.groups = mapFromGroupSummaryDtos(dto.groups);
  return event;
};
