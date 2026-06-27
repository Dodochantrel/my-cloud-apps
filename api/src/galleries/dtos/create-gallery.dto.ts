import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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
  @Type(() => Boolean)
  @IsBoolean()
  isPrivate!: boolean;
}
