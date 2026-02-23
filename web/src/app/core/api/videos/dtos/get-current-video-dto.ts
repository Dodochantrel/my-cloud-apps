import { Video } from '../../../models/videos/video';

export interface GetCurrentVideoDto {
    externalId: string;
    title: string;
    isToWatch: boolean;
    isSeen: boolean;
    isFavorite: boolean;
    userRating: number | null;
    globalRating: number;
    seenAt: string | null;
    type: 'movie' | 'serie';
    fileUrl: string | null;
    backdropUrl: string | null;
    releaseDate: string;
    description: string;
    genres: string[];
}

export const mapFromGetCurrentVideoDtoToVideo = (dto: GetCurrentVideoDto): Video => {
    const video = new Video(
        dto.externalId,
        dto.title,
        dto.type,
        new Date(dto.releaseDate),
        dto.description,
        dto.globalRating,
        dto.genres,
        null,
        dto.fileUrl,
    );
    video.backdropUrl = dto.backdropUrl;
    return video;
};

export const mapFromGetCurrentVideoDtosToVideos = (dtos: GetCurrentVideoDto[]): Video[] => {
    return dtos.map((dto) => mapFromGetCurrentVideoDtoToVideo(dto));
};