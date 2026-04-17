import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';
import { EventCategory } from '../event-category.entity';

export class UpdateEventCategoryRequestDto {
  @ApiProperty({
    description: 'Nouveau nom de la catégorie',
    example: 'Musique',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Nouvelle couleur hexadécimale de la catégorie',
    example: '#00FF00',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(7)
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message: 'La couleur doit être un code hexadécimal valide (ex: #FF5733).',
  })
  color?: string;
}

export class UpdateEventCategoryResponseDto {
  @ApiProperty({ description: 'Identifiant de la catégorie', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Nom de la catégorie', example: 'Musique' })
  name: string;

  @ApiProperty({ description: 'Couleur de la catégorie', example: '#00FF00' })
  color: string;

  constructor(category: EventCategory) {
    this.id = category.id;
    this.name = category.name;
    this.color = category.color;
  }
}
