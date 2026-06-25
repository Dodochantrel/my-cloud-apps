import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class CreateGalleryDto {
  @ApiProperty({
    description: 'ID de la catégorie de galerie',
    format: 'uuid',
  })
  @IsUUID()
  categoryId!: string;

  @ApiProperty({
    description: 'Indique si la galerie est privée',
  })
  @IsBoolean()
  isPrivate!: boolean;
}
