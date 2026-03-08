import { Video } from '../../../models/videos/video';

export interface GetAllVideoDto {
    id: string;
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

export const mapFromGetAllVideoDtoToVideo = (dto: GetAllVideoDto): Video => {
    const video = new Video(
        dto.id,
        dto.title,
        dto.type,
        new Date(dto.releaseDate),
        dto.description,
        dto.globalRating,
        dto.genres,
        dto.fileUrl,
    );
    video.backdropUrl = dto.backdropUrl;
    return video;
};

export const mapFromGetAllVideoDtosToVideos = (dtos: GetAllVideoDto[]): Video[] => {
    return dtos.map((dto) => mapFromGetAllVideoDtoToVideo(dto));
};