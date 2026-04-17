import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageQuery } from 'src/pagination/page-query';
import { EventCategory } from '../event-category.entity';

export class GetAllEventsCategoriesQueryDto extends PageQuery {
  @ApiPropertyOptional({
    description: 'Recherche par nom de catégorie',
    example: 'Sport',
  })
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetAllEventsCategoriesResponseDto {
  @ApiProperty({ description: 'Identifiant de la catégorie', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Nom de la catégorie', example: 'Sport' })
  name: string;

  @ApiProperty({ description: 'Couleur de la catégorie', example: '#FF5733' })
  color: string;

  constructor(category: EventCategory) {
    this.id = category.id;
    this.name = category.name;
    this.color = category.color;
  }
}

export function toGetAllEventsCategoriesResponseDtoList(
  categories: EventCategory[],
): GetAllEventsCategoriesResponseDto[] {
  return categories.map((c) => new GetAllEventsCategoriesResponseDto(c));
}
