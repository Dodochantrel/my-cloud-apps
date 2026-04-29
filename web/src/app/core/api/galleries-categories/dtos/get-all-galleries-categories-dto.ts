import { GalleryCategoryModel } from '../../../models/galleries/gallery-category-model';

export interface GetAllGalleriesCategoriesDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  childrens: GetAllGalleriesCategoriesDto[];
}

export const mapFromGetAllGalleriesCategoriesDtosToGalleriesCategories = (
  dtos: GetAllGalleriesCategoriesDto[],
): GalleryCategoryModel[] =>
  dtos.map(
    (dto) =>
      new GalleryCategoryModel(
        dto.id,
        dto.name,
        dto.createdAt,
        dto.updatedAt,
        mapFromGetAllGalleriesCategoriesDtosToGalleriesCategories(dto.childrens),
      ),
  );
