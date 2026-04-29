export interface SerieDetails {
  numberOfSeasons: number;
  numberOfEpisodes: number;
  seasons: SeasonDetails[];
  tagline: string;
  originalLanguage: string;
}

export interface SeasonDetails {
  seasonNumber: number;
  episodes: EpisodeDetails[];
  airDate: Date;
  overview: string;
  fileUrl: string | null;
}

export interface EpisodeDetails {
  number: number;
  title: string;
  overview: string;
  airDate: Date;
  runtime: number;
}
