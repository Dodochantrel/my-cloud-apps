import { Video } from '../../../models/videos/video';

export interface GetOneVideoDto {
  id?: string;
  externalId: string;
  title: string;
  type: 'movie' | 'serie';
  fileUrl: string;
  releaseDate: string;
  description: string;
  genres: string[];
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
    dto.genres,
    dto.id ?? null,
    dto.fileUrl
  );
  return video;
};
