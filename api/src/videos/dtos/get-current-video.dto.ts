import { PageQuery } from 'src/pagination/page-query';
import { VideoType } from '../video';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetCurrentVideoQueryDto extends PageQuery {
  @ApiProperty({
    description: 'Type de vidéo à rechercher',
    enum: VideoType,
    example: 'movie',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(VideoType, { message: 'Le type doit être movie, series ou anime' })
  @Transform(({ value }) => value as VideoType)
  type: VideoType;
}
