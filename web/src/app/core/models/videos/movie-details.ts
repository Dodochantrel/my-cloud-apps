export class MovieDetails {
  duration: number;
  originalTitle: string;
  tagline: string;
  budget: number;
  revenue: number;
  originalLanguage: string;

  constructor(duration: number, originalTitle: string, tagline: string, budget: number, revenue: number, originalLanguage: string) {
    this.duration = duration;
    this.originalTitle = originalTitle;
    this.tagline = tagline;
    this.budget = budget;
    this.revenue = revenue;
    this.originalLanguage = originalLanguage;
  }

  get durationInHoursAndMinutes(): string {
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    return `${hours}h ${minutes}m`;
  }
}
