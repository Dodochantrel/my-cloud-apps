import { Video } from '../../../models/videos/video';
import { VideoReview } from '../../../models/videos/video-review';

interface VideoReviewDto {
  id: string;
  isWatched: boolean;
  isToWatch: boolean;
  comment: string;
  isFavorite: boolean;
  actingRating: number;
  scenarioRating: number;
  visualsRating: number;
  musicRating: number;
  updatedAt: string;
  createdAt: string;
}

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
  review: VideoReviewDto | null;
}

const mapFromVideoReviewDtoToVideoReview = (review: VideoReviewDto): VideoReview => {
  return new VideoReview(review.id, review.isWatched, review.isToWatch, review.isFavorite);
};

export const mapFromGetCurrentVideoDtoToVideo = (dto: GetCurrentVideoDto): Video => {
  const video = new Video(
    dto.externalId,
    dto.title,
    dto.type,
    new Date(dto.releaseDate),
    dto.description,
    dto.globalRating,
    dto.genres,
    dto.fileUrl,
  );
  video.backdropUrl = dto.backdropUrl;
  video.review = dto.review ? mapFromVideoReviewDtoToVideoReview(dto.review) : null;
  return video;
};

export const mapFromGetCurrentVideoDtosToVideos = (dtos: GetCurrentVideoDto[]): Video[] => {
  return dtos.map((dto) => mapFromGetCurrentVideoDtoToVideo(dto));
};
