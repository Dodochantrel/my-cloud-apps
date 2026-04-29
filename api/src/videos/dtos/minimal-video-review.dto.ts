import { ApiProperty } from '@nestjs/swagger';
import { VideoType, Video } from '../video.entity';
import { VideoReview } from '../video-review.entity';

export class MinimalVideoReviewDto {
  @ApiProperty({
    description: 'Identifiant de la review vidéo',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Indique si la vidéo a été vue',
    example: true,
  })
  isWatched: boolean;

  @ApiProperty({
    description: 'Indique si la vidéo est dans la watchlist',
    example: false,
  })
  isToWatch: boolean;

  @ApiProperty({
    description: 'Indique si la vidéo est marquée en favori',
    example: true,
  })
  isFavorite: boolean;

  constructor(videoReview: VideoReview) {
    this.id = videoReview.id;
    this.isWatched = videoReview.isWatched;
    this.isToWatch = videoReview.isToWatch;
    this.isFavorite = videoReview.isFavorite;
  }
}
