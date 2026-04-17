import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { EventCategory } from '../event-category.entity';

export class CreateEventCategoryRequestDto {
  @ApiProperty({
    description: 'Nom de la catégorie',
    example: 'Sport',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Couleur hexadécimale de la catégorie',
    example: '#FF5733',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(7)
  @Matches(/^#[0-9A-Fa-f]{6}$/, {
    message: 'La couleur doit être un code hexadécimal valide (ex: #FF5733).',
  })
  color!: string;
}

export class CreateEventCategoryResponseDto {
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
