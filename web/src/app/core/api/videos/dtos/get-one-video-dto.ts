import { MovieDetails } from '../../../models/videos/movie-details';
import { Video } from '../../../models/videos/video';

export interface GetOneVideoDto {
  id?: string;
  externalId: string;
  title: string;
  type: 'movie' | 'serie';
  fileUrl: string;
  backdropUrl: string | null;
  releaseDate: string;
  description: string;
  genres: string[];
  globalRating: number;
  movieDetails?: {
    duration: number;
    originalTitle: string;
    tagline: string;
  };
  serieDetails?: {
    numberOfSeasons: number;
    numberOfEpisodes: number;
    originalTitle: string;
    tagline: string;
  };
}

export const mapFromGetOneVideoDtoToVideo = (dto: GetOneVideoDto): Video => {
  const video = new Video(
    dto.externalId,
    dto.title,
    dto.type,
    new Date(dto.releaseDate),
    dto.description,
    dto.globalRating,
    dto.genres,
    dto.id ?? null,
    dto.fileUrl,
  );
  video.movieDetails = dto.movieDetails
    ? new MovieDetails(
        dto.movieDetails.duration,
        dto.movieDetails.originalTitle,
        dto.movieDetails.tagline,
      )
    : null;
  video.backdropUrl = dto.backdropUrl;
  return video;
};
