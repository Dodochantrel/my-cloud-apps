import { ApiProperty } from '@nestjs/swagger';
import { Gallery } from '../gallery.entity';

export class GalleryResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  mimetype!: string;

  @ApiProperty()
  size!: number;

  @ApiProperty({ format: 'uuid' })
  categoryId!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({
    example: {
      small: 'https://storage.example/signed/small',
      medium: 'https://storage.example/signed/medium',
      big: 'https://storage.example/signed/big',
    },
  })
  urls!: {
    small: string;
    medium: string;
    big: string;
  };

  constructor(gallery: Gallery, urls: { small: string; medium: string; big: string }) {
    this.id = gallery.id;
    this.name = gallery.name;
    this.mimetype = gallery.mimetype;
    this.size = gallery.size;
    this.categoryId = gallery.category.id;
    this.createdAt = gallery.createdAt;
    this.updatedAt = gallery.updatedAt;
    this.urls = urls;
  }
}
