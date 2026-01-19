import { MovieDetails } from "./movie-details";
import { VideoCasting } from "./video-casting";
import { VideoDirector } from "./video-director";

export class Video {
  id: string | null;
  externalId: string;
  title: string;
  type: 'movie' | 'serie';
  fileUrl: string | null;
  backdropUrl: string | null = null;
  releaseDate: Date;
  description: string;
  globalRating: number;
  genres: string[];
  castings: VideoCasting[] = [];
  director: VideoDirector | null = null;
  movieDetails: MovieDetails | null = null;

  constructor(
    externalId: string,
    title: string,
    type: 'movie' | 'serie',
    releaseDate: Date,
    description: string,
    globalRating: number,
    genres: string[],
    id: string | null,
    fileUrl: string | null,
  ) {
    this.id = id;
    this.externalId = externalId;
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
}
