export class Episode {
  release: Date;
  number: number;
  id: number;
  name: string;
  overview: string;
  duration: number;
  seasonNumber: number;
  path: string | null;
  globalRating: number;

  constructor(
    id: number,
    release: Date,
    number: number,
    name: string,
    overview: string,
    duration: number,
    seasonNumber: number,
    path: string | null,
    globalRating: number,
  ) {
    this.id = id;
    this.release = release;
    this.number = number;
    this.name = name;
    this.overview = overview;
    this.duration = duration;
    this.seasonNumber = seasonNumber;
    this.path = path;
    this.globalRating = globalRating;
  }
}

export class VideoSeason {
    number: number;
    airDate: Date | null;
    overview: string;
    episodes: Episode[];

    constructor(
        number: number,
        airDate: Date | null,
        overview: string,
        episodes: Episode[],
    ) {
        this.number = number;
        this.airDate = airDate;
        this.overview = overview;
        this.episodes = episodes;
    }
}
