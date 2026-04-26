import { EventModel } from '../../../models/events/event-model';
import { EventCategorySummaryDto, mapCategorySummary } from './event-category-summary-dto';
import { GroupSummaryDto, mapFromGroupSummaryDtos } from './group-summary-dto';

export interface UpdateEventRequestDto {
  title?: string;
  allDay?: boolean;
  start?: string;
  end?: string;
  categoryId?: string | null;
}

export interface UpdateEventResponseDto {
  id: string;
  title: string;
  allDay: boolean;
  start: string;
  end: string;
  category: EventCategorySummaryDto | null;
    groups: GroupSummaryDto[];
}

export const mapFromUpdateEventDtoToModel = (
  dto: UpdateEventResponseDto,
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
}