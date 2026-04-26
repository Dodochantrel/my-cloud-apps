import { EventCategoryModel } from "../../../models/events/event-category-model";

export interface EventCategorySummaryDto {
  id: string;
  name: string;
  color: string;
}

export const mapCategorySummary = (
  dto: EventCategorySummaryDto | null,
): EventCategoryModel | null =>
  dto ? new EventCategoryModel(dto.id, dto.name, dto.color) : null;