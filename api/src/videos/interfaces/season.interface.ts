import { Episode } from "./episode.interface";

export interface Season {
    seasonNumber: number,
    airDate: Date | null,
    overview: string,
    episodes: Episode[],
}