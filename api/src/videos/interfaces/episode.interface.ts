export interface Episode {
  release: Date;
  number: number;
  id: number;
  name: string;
  overview: string;
  duration: number;
  seasonNumber: number;
  path: string | null;
  globalRating: number;
}
