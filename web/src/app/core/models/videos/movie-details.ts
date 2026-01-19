export class MovieDetails {
  duration: number;
  originalTitle: string;
  tagline: string;

  constructor(duration: number, originalTitle: string, tagline: string) {
    this.duration = duration;
    this.originalTitle = originalTitle;
    this.tagline = tagline;
  }

  get durationInHoursAndMinutes(): string {
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    return `${hours}h ${minutes}m`;
  }
}
