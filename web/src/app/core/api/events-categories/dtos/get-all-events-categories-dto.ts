import { EventCategoryModel } from '../../../models/events/event-category-model';

export interface GetAllEventsCategoriesResponseDto {
  id: string;
  name: string;
  color: string;
}

export const mapFromGetAllEventsCategoriesDtoToModel = (
  dto: GetAllEventsCategoriesResponseDto,
): EventCategoryModel => {
  return new EventCategoryModel(dto.id, dto.name, dto.color);
};

export const mapFromGetAllEventsCategoriesDtosToModels = (
  dtos: GetAllEventsCategoriesResponseDto[],
): EventCategoryModel[] => {
  return dtos.map(mapFromGetAllEventsCategoriesDtoToModel);
};
