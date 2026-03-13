import { MovieDetails } from './interfaces/movie-details.interface';
import { SerieDetails } from './interfaces/serie-details.interface';
import { ProductionCompany } from './interfaces/production-company.interface';

export enum VideoType {
  Serie = 'serie',
  Movie = 'movie',
  Anime = 'anime',
}

export class Video {
  id: string;
  title: string;
  userRating: number | null;
  globalRating: number | null;
  type: VideoType;
  updatedAt: Date;
  createdAt: Date;
  fileUrl: string | null;
  backdropUrl: string | null;
  releaseDate: Date;
  description: string;
  genres: string[];
  productionCompanies: ProductionCompany[];
  movieDetails: MovieDetails | null;
  serieDetails: SerieDetails | null;

  constructor(partial: Partial<Video>) {
    Object.assign(this, partial);
  }
}
