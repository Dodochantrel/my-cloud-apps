import { ApiProperty } from '@nestjs/swagger';
import { VideoReview } from '../video-review.entity';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { VideoType } from '../video';
import { Transform } from 'class-transformer';

export class GetVideoReviewRequestDto {
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

export class GetVideoReviewResponseDto {
  @ApiProperty({
    description: 'The ID of the video review',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Indicates if the video has been watched',
    example: true,
    required: true,
  })
  isWatched: boolean;

  @ApiProperty({
    description: 'Indicates if the video is in the watchlist',
    example: true,
    required: true,
  })
  isToWatch: boolean;

  @ApiProperty({
    description: 'Indicates if the video is a favorite',
    example: true,
    nullable: true,
  })
  comment: string | null;

  @ApiProperty({
    description: 'Indicates if the video is a favorite',
    example: true,
    nullable: true,
  })
  isFavorite: boolean;

  @ApiProperty({
    description: 'Indicates the acting rating of the video',
    example: 4,
    nullable: true,
  })
  actingRating: number | null;

  @ApiProperty({
    description: 'Indicates the story rating of the video',
    example: 4,
    nullable: true,
  })
  scenarioRating: number | null;

  @ApiProperty({
    description: 'Indicates the visuals rating of the video',
    example: 4,
    nullable: true,
  })
  visualsRating: number | null;

  @ApiProperty({
    description: 'Indicates the music rating of the video',
    example: 4,
    nullable: true,
  })
  musicRating: number | null;

  constructor(videoReview: VideoReview) {
    this.id = videoReview.id;
    this.isWatched = videoReview.isWatched;
    this.isToWatch = videoReview.isToWatch;
    this.comment = videoReview.comment;
    this.isFavorite = videoReview.isFavorite;
    this.actingRating = videoReview.actingRating;
    this.scenarioRating = videoReview.scenarioRating;
    this.visualsRating = videoReview.visualsRating;
    this.musicRating = videoReview.musicRating;
  }
}
