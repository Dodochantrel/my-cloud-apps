export class VideoReview {
  id: string;
  isWatched: boolean;
  isToWatch: boolean;
  comment: string | null = null;
  rating: number | null = null;
  isFavorite: boolean;
  actingRating: number | null = null;
  scenarioRating: number | null = null;
  visualsRating: number | null = null;
  musicRating: number | null = null;

  constructor(
    id: string,
    isWatched: boolean,
    isToWatch: boolean,
    isFavorite: boolean,
  ) {
    this.id = id;
    this.isWatched = isWatched;
    this.isToWatch = isToWatch;
    this.isFavorite = isFavorite;
  }
}
