import { EventCategoryModel } from '../../../models/events/event-category-model';

export interface CreateEventCategoryRequestDto {
  name: string;
  color: string;
}

export interface CreateEventCategoryResponseDto {
  id: string;
  name: string;
  color: string;
}

export const mapFromCreateEventCategoryDtoToModel = (
  dto: CreateEventCategoryResponseDto,
): EventCategoryModel => {
  return new EventCategoryModel(dto.id, dto.name, dto.color);
};
