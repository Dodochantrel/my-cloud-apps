import { Episode, VideoSeason } from "../../../models/videos/video-season";

export interface EpisodeDto {
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

export interface GetSeasonDto {
    seasonNumber: number,
    airDate: Date | null,
    overview: string,
    episodes: EpisodeDto[],
}

const mapFromEpisodeDtoToEpisode = (dto: EpisodeDto): Episode => {
    return new Episode(
        dto.id,
        dto.release,
        dto.number,
        dto.name,
        dto.overview,
        dto.duration,
        dto.seasonNumber,
        dto.path,
        dto.globalRating,
    );
}

export const mapFromGetSeasonDtoToVideoSeason = (dto: GetSeasonDto): VideoSeason => {
    return new VideoSeason(
        dto.seasonNumber,
        dto.airDate,
        dto.overview,
        dto.episodes.map(episodeDto => mapFromEpisodeDtoToEpisode(episodeDto)),
    );
}

export const mapFromGetSeasonDtosToVideoSeasons = (dtos: GetSeasonDto[]): VideoSeason[] => {
    return dtos.map(dto => mapFromGetSeasonDtoToVideoSeason(dto));
}