import { MovieDetails } from '../../../models/videos/movie-details';
import { ProductionCompany } from '../../../models/videos/production-company';
import { SerieDetails } from '../../../models/videos/serie-details';
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
    budget: number;
    revenue: number;
    originalLanguage: string;
  };
  serieDetails?: {
    numberOfSeasons: number;
    numberOfEpisodes: number;
    originalLanguage: string;
    tagline: string;
  };
  productionCompanies: {
    id: number;
    fileUrl: string | null;
    name: string;
    originCountry: string;
  }[];
}

const mapFromProductionCompaniesDtoToProductionCompanies = (dto: GetOneVideoDto['productionCompanies']) => {
  return dto.map(
    (company) =>
      new ProductionCompany(
        company.id,
        company.fileUrl,
        company.name,
      ),
  );
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
        dto.movieDetails.budget,
        dto.movieDetails.revenue,
        dto.movieDetails.originalLanguage,
      )
    : null;
  video.serieDetails = dto.serieDetails
    ? new SerieDetails(
        dto.serieDetails.numberOfSeasons,
        dto.serieDetails.numberOfEpisodes,
        dto.serieDetails.tagline,
        dto.serieDetails.originalLanguage,
      )
    : null;
  video.backdropUrl = dto.backdropUrl;
  video.productionCompanies = mapFromProductionCompaniesDtoToProductionCompanies(dto.productionCompanies);
  return video;
};
