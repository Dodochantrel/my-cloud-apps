import { GalleryCategoryModel } from "../../../models/galleries/gallery-category-model";

export interface PostGalleryCategoryRequestDto {
  name: string;
  parentId: string | null;
  groupsId: string[];
}

export interface PostGalleryCategoryResponseDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const mapFromPostGalleryCategoryResponseDtoToGalleryCategory = (
  dto: PostGalleryCategoryResponseDto,
): GalleryCategoryModel => new GalleryCategoryModel(dto.id, dto.name, dto.createdAt, dto.updatedAt, []);