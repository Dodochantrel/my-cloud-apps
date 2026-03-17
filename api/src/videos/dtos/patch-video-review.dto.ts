import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { VideoReview } from '../video-review.entity';
import { VideoType } from '../video.entity';

export class PatchVideoReviewRequestDto {
  @ApiProperty({
    description: 'Indicates if the video has been watched',
    example: true,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isWatched: boolean;

  @ApiProperty({
    description: 'Indicates if the video is in the watchlist',
    example: true,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isToWatch: boolean;

  @ApiProperty({
    description: 'Indicates if the video is a favorite',
    example: true,
    nullable: true,
  })
  @IsString()
  comment: string | null;

  @ApiProperty({
    description: 'Indicates if the video is a favorite',
    example: true,
    nullable: true,
  })
  @IsBoolean()
  isFavorite: boolean;

  @ApiProperty({
    description: 'Indicates the acting rating of the video',
    example: 4,
    nullable: true,
  })
  @IsNumber()
  actingRating: number | null;

  @ApiProperty({
    description: 'Indicates the story rating of the video',
    example: 4,
    nullable: true,
  })
  @IsNumber()
  scenarioRating: number | null;

  @ApiProperty({
    description: 'Indicates the visuals rating of the video',
    example: 4,
    nullable: true,
  })
  @IsNumber()
  visualsRating: number | null;

  @ApiProperty({
    description: 'Indicates the music rating of the video',
    example: 4,
    nullable: true,
  })
  @IsNumber()
  musicRating: number | null;

  @ApiProperty({
    description: 'The type of the video',
  })
  @IsNotEmpty()
  videoType: VideoType;
}

export const mapFromPatchVideoReviewRequestDtoToVideoReview = (
  dto: PatchVideoReviewRequestDto,
): VideoReview => {
  return new VideoReview({
    isWatched: dto.isWatched,
    isToWatch: dto.isToWatch,
    comment: dto.comment || undefined,
    isFavorite: dto.isFavorite,
    actingRating: dto.actingRating || undefined,
    scenarioRating: dto.scenarioRating || undefined,
    visualsRating: dto.visualsRating || undefined,
    musicRating: dto.musicRating || undefined,
  });
};

export class PatchVideoReviewResponseDto {
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
    this.comment = videoReview.comment || null;
    this.isFavorite = videoReview.isFavorite;
    this.actingRating = videoReview.actingRating || null;
    this.scenarioRating = videoReview.scenarioRating || null;
    this.visualsRating = videoReview.visualsRating || null;
    this.musicRating = videoReview.musicRating || null;
  }
}
