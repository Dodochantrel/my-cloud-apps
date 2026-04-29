import { ApiProperty } from '@nestjs/swagger';
import { VideoType } from '../video.entity';
import { IsNotEmpty } from 'class-validator';

export class PatchVideoBooleanRequestDto {
  @ApiProperty({
    description: 'Indique si la vidéo a été vue',
    example: true,
  })
  @IsNotEmpty()
  type: VideoType;
}
