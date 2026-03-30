import { Video } from '../../../models/videos/video';
import { VideoReview } from '../../../models/videos/video-review';

export interface GetToWatchVideoItemDto {
    externalId: string;
    title: string;
    type: 'movie' | 'serie';
    releaseDate: string;
    description?: string;
    globalRating: number;
    genres?: string[];
    fileUrl: string | null;
}

export interface GetToWatchVideoDto {
    id: string;
    isWatched: boolean;
    isToWatch: boolean;
    isFavorite: boolean;
    video: GetToWatchVideoItemDto;
}

export const mapFromGetToWatchVideoDtoToVideoReview = (
    dto: GetToWatchVideoDto,
): VideoReview => {
    return new VideoReview(dto.id, dto.isWatched, dto.isToWatch, dto.isFavorite);
};

export const mapFromGetToWatchVideoDtoToVideo = (
    dto: GetToWatchVideoDto,
): Video => {
    const video = new Video(
        dto.video.externalId,
        dto.video.title,
        dto.video.type,
        new Date(dto.video.releaseDate),
        dto.video.description ?? '',
        dto.video.globalRating,
        dto.video.genres ?? [],
        dto.video.fileUrl,
    );
    video.review = mapFromGetToWatchVideoDtoToVideoReview(dto);
    return video;
};

export const mapFromGetToWatchVideoDtosToVideos = (
    dtos: GetToWatchVideoDto[],
): Video[] => {
    return dtos.map((dto) => mapFromGetToWatchVideoDtoToVideo(dto));
};