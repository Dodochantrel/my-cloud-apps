import { EventModel } from '../../../models/events/event-model';
import { EventCategoryModel } from '../../../models/events/event-category-model';
import { EventCategorySummaryDto } from './get-all-events-dto';

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
}

export const mapFromUpdateEventDtoToModel = (
  dto: UpdateEventResponseDto,
): EventModel => {
  return new EventModel(
    dto.id,
    dto.allDay,
    new Date(dto.start),
    new Date(dto.end),
    dto.title,
    dto.category
      ? new EventCategoryModel(dto.category.id, dto.category.name, dto.category.color)
      : null,
  );
};
