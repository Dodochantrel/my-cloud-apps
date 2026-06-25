import { ApiProperty } from '@nestjs/swagger';
import { Gallery } from '../gallery.entity';
import { DefaultFileDataResponseDto } from 'src/files/dtos/default-file-data.dto';

export class GalleryResponseDto {
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @ApiProperty({ type: DefaultFileDataResponseDto })
  fileData: DefaultFileDataResponseDto;

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
    this.categoryId = gallery.category.id;
    this.createdAt = gallery.createdAt;
    this.updatedAt = gallery.updatedAt;
    this.urls = urls;
    this.fileData = new DefaultFileDataResponseDto(gallery.fileData);
  }
}
