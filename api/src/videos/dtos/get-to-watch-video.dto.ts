import { ApiProperty } from '@nestjs/swagger';
import { VideoReview } from '../video-review.entity';
import { Video, VideoType } from '../video.entity';

class VideoInfoDto {
  @ApiProperty({
    description: 'Identifiant externe de la vidéo',
    example: '550',
  })
  externalId: string;

  @ApiProperty({
    description: 'Titre de la vidéo',
    example: 'Fight Club',
  })
  title: string;

  @ApiProperty({
    description: 'Type de la vidéo',
    enum: VideoType,
    example: VideoType.Movie,
  })
  type: VideoType;

  @ApiProperty({
    description: 'Date de sortie de la vidéo',
    example: '1999-10-15T00:00:00.000Z',
  })
  releaseDate: Date;

  @ApiProperty({
    description: 'Description de la vidéo',
    example:
      'Un employé de bureau désabusé croise la route d’un vendeur de savon charismatique.',
  })
  description: string;

  @ApiProperty({
    description: 'Note globale de la vidéo',
    example: 8.8,
  })
  globalRating: number;

  @ApiProperty({
    description: 'Genres associés à la vidéo',
    example: ['Drama'],
    type: [String],
  })
  genres: string[];

  @ApiProperty({
    description: 'URL du fichier vidéo si disponible',
    example: 'https://cdn.example.com/videos/fight-club.mp4',
    nullable: true,
  })
  fileUrl: string | null;

  constructor(video: Video) {
    this.externalId = video.externalId;
    this.title = video.title;
    this.type = video.type;
    this.releaseDate = video.releaseDate;
    this.description = video.description;
    this.globalRating = video.globalRating;
    this.genres = video.genres;
    this.fileUrl = video.fileUrl ?? null;
  }
}

export class GetToWatchVideoResponseDto {
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

  @ApiProperty({
    description: 'Informations de la vidéo associée à la review',
    type: () => VideoInfoDto,
  })
  video: VideoInfoDto;

  constructor(videoReview: VideoReview) {
    this.id = videoReview.id;
    this.isWatched = videoReview.isWatched;
    this.isToWatch = videoReview.isToWatch;
    this.isFavorite = videoReview.isFavorite;
    this.video = new VideoInfoDto(videoReview.video);
  }
}

export function toGetToWatchVideoResponseDtoList(
  videoReviews: VideoReview[],
): GetToWatchVideoResponseDto[] {
  return videoReviews.map(
    (videoReview) => new GetToWatchVideoResponseDto(videoReview),
  );
}
