import { MovieDetails } from './movie-details';
import { ProductionCompany } from "./production-company";
import { SerieDetails } from './serie-details';
import { VideoCasting } from "./video-casting";
import { VideoDirector } from "./video-director";
import { VideoProvider } from "./video-provider";
import { VideoReview } from './video-review';
import { VideoSeason } from './video-season';
import { VideoTrailer } from "./video-trailer";

export class Video {
  id: string;
  title: string;
  type: VideoType;
  fileUrl: string | null;
  backdropUrl: string | null = null;
  releaseDate: Date;
  description: string;
  globalRating: number;
  genres: string[];
  castings: VideoCasting[] = [];
  director: VideoDirector | null = null;
  movieDetails: MovieDetails | null = null;
  serieDetails: SerieDetails | null = null;
  productionCompanies: ProductionCompany[] = [];
  trailer: VideoTrailer | null = null;
  providers: VideoProvider[] = [];
  seasons: VideoSeason[] = [];
  review: VideoReview | null = null;

  constructor(
    id: string,
    title: string,
    type: VideoType,
    releaseDate: Date,
    description: string,
    globalRating: number,
    genres: string[],
    fileUrl: string | null,
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.releaseDate = releaseDate;
    this.description = description;
    this.globalRating = globalRating;
    this.genres = genres;
    this.fileUrl = fileUrl;
  }

  get globalRatingFormatted(): string {
    return this.globalRating.toFixed(1);
  }

  get releaseYear(): string {
    return this.releaseDate.getFullYear().toString();
  }

  get fileUrlOrEmpty(): string {
    return this.fileUrl ?? '/images/placeholder.svg';
  }

  get label(): string {
    switch (this.type) {
      case 'movie':
        return 'Film';
      case 'serie':
        return 'Série';
    }
  }

  get videoWatched(): boolean {
    return this.review?.isWatched ?? false;
  }

  get videoToWatch(): boolean {
    return this.review?.isToWatch ?? false;
  }

  get videoFavorite(): boolean {
    return this.review?.isFavorite ?? false;
  }

  set videoWatched(isWatched: boolean) {
    if (!this.review) {
      this.review = new VideoReview('', isWatched, false, false);
    } else {
      this.review.isWatched = isWatched;
    }
  }

  set videoToWatch(isToWatch: boolean) {
    if (!this.review) {
      this.review = new VideoReview('', false, isToWatch, false);
    } else {
      this.review.isToWatch = isToWatch;
    }
  }

  set videoFavorite(isFavorite: boolean) {
    if (!this.review) {
      this.review = new VideoReview('', false, false, isFavorite);
    } else {
      this.review.isFavorite = isFavorite;
    }
  }
}

export type VideoType = 'movie' | 'serie';