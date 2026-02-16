export class SerieDetails {
    numberOfSeasons: number;
    numberOfEpisodes: number;
    tagline: string;
    originalLanguage: string;

    constructor(
        numberOfSeasons: number,
        numberOfEpisodes: number,
        tagline: string,
        originalLanguage: string,
    ) {
        this.numberOfSeasons = numberOfSeasons;
        this.numberOfEpisodes = numberOfEpisodes;
        this.tagline = tagline;
        this.originalLanguage = originalLanguage;
    }
}
