import { Video } from '../../../models/videos/video';
import { VideoReview } from '../../../models/videos/video-review';

export interface GetWatchedVideoItemDto {
    externalId: string;
    title: string;
    type: 'movie' | 'serie';
    releaseDate: string;
    description?: string;
    globalRating: number;
    genres?: string[];
    fileUrl: string | null;
}

export interface GetWatchedVideoDto {
    id: string;
    isWatched: boolean;
    isToWatch: boolean;
    isFavorite: boolean;
    video: GetWatchedVideoItemDto;
}

export const mapFromGetWatchedVideoDtoToVideoReview = (
    dto: GetWatchedVideoDto,
): VideoReview => {
    return new VideoReview(dto.id, dto.isWatched, dto.isToWatch, dto.isFavorite);
};

export const mapFromGetWatchedVideoDtoToVideo = (
    dto: GetWatchedVideoDto,
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
    video.review = mapFromGetWatchedVideoDtoToVideoReview(dto);
    return video;
};

export const mapFromGetWatchedVideoDtosToVideos = (
    dtos: GetWatchedVideoDto[],
): Video[] => {
    return dtos.map((dto) => mapFromGetWatchedVideoDtoToVideo(dto));
};