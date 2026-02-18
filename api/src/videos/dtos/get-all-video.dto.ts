import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { VideoType } from '../video.entity';

export class GetAllVideoQueryDto {
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

    @ApiProperty({
        description: 'Terme de recherche pour filtrer les vidéos',
        example: 'Inception',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    search: string;
}