import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
    description: 'Indicates the rating of the video',
    example: 5,
    nullable: true,
  })
  @IsNumber()
  rating: number | null;

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
  storyRating: number | null;

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
}

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
    description: 'Indicates the rating of the video',
    example: 5,
    nullable: true,
  })
  rating: number | null;

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
  storyRating: number | null;

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
}
