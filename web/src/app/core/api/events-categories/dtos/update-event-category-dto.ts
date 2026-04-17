import { EventCategoryModel } from '../../../models/events/event-category-model';

export interface UpdateEventCategoryRequestDto {
  name?: string;
  color?: string;
}

export interface UpdateEventCategoryResponseDto {
  id: string;
  name: string;
  color: string;
}

export const mapFromUpdateEventCategoryDtoToModel = (
  dto: UpdateEventCategoryResponseDto,
): EventCategoryModel => {
  return new EventCategoryModel(dto.id, dto.name, dto.color);
};
