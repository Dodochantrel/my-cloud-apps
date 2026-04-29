import { GalleryCategoryModel } from "../../../models/galleries/gallery-category-model";

export interface PatchGalleryCategoryRequestDto {
  name: string;
  parentId: string | null;
}

export interface PatchGalleryCategoryResponseDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const mapFromPatchGalleryCategoryResponseDtoToGalleryCategory = (
  dto: PatchGalleryCategoryResponseDto,
): GalleryCategoryModel => new GalleryCategoryModel(dto.id, dto.name, dto.createdAt, dto.updatedAt, []);