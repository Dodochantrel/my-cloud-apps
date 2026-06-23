import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PageQuery } from 'src/pagination/page-query';
import { GalleryCategory } from '../gallery-category.entity';
import { IsOptional } from 'class-validator';

export class GetAllGalleryCategoriesQueryDto extends PageQuery {
  @ApiPropertyOptional({
    description: 'Terme de recherche pour filtrer les catégories par nom',
  })
  @IsOptional()
  search?: string;
}

export class GetAllGalleriesCategoriesResponseDto {
  @ApiProperty({ description: 'Identifiant de la catégorie' })
  id!: string;

  @ApiProperty({ description: 'Nom de la catégorie' })
  name!: string;

  @ApiProperty({ description: 'Date de création de la catégorie' })
  createdAt!: Date;

  @ApiProperty({ description: 'Date de dernière mise à jour de la catégorie' })
  updatedAt!: Date;

  @ApiProperty({ description: 'Sous-catégories de la catégorie' })
  childrens!: GetAllGalleriesCategoriesResponseDto[];

  constructor(galleryCategory: GalleryCategory) {
    this.id = galleryCategory.id;
    this.name = galleryCategory.name;
    this.createdAt = galleryCategory.createdAt;
    this.updatedAt = galleryCategory.updatedAt;
    this.childrens = galleryCategory.childrens ? galleryCategory.childrens.map(
      (child) => new GetAllGalleriesCategoriesResponseDto(child),
    ) : [];
  }
}

export const mapFromGalleryCategoryToGetAllGalleriesCategoriesResponseDto = (
  galleriesCategories: GalleryCategory[],
): GetAllGalleriesCategoriesResponseDto[] => {
  return galleriesCategories.map(
    (galleryCategory) =>
      new GetAllGalleriesCategoriesResponseDto(galleryCategory),
  );
};
