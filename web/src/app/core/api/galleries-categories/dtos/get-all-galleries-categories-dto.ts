import { GalleryCategory } from '../../../models/galleries/gallery-category';

export interface GetAllGalleriesCategoriesDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  childrens: GetAllGalleriesCategoriesDto[];
}

export const mapFromGetAllGalleriesCategoriesDtosToGalleriesCategories = (
  dtos: GetAllGalleriesCategoriesDto[],
): GalleryCategory[] =>
  dtos.map(
    (dto) =>
      new GalleryCategory(
        dto.id,
        dto.name,
        dto.createdAt,
        dto.updatedAt,
        mapFromGetAllGalleriesCategoriesDtosToGalleriesCategories(dto.childrens),
      ),
  );
