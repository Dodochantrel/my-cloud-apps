import { VideoType } from "../../../models/videos/video";
import { VideoReview } from "../../../models/videos/video-review";

export interface GetVideoReviewResponseDto {
  id: string;
  isWatched: boolean;
  isToWatch: boolean;
  comment: string | null;
  rating: number | null;
  isFavorite: boolean;
  actingRating: number | null;
  scenarioRating: number | null;
  visualsRating: number | null;
  musicRating: number | null;
  videoType: VideoType;
}

export const mapFromGetVideoReviewResponseDtoToVideoReview = (
  dto: GetVideoReviewResponseDto,
): VideoReview => {
  const review = new VideoReview(dto.id, dto.isWatched, dto.isToWatch, dto.isFavorite);
  review.comment = dto.comment;
  review.rating = dto.rating;
  review.actingRating = dto.actingRating;
  review.scenarioRating = dto.scenarioRating;
  review.visualsRating = dto.visualsRating;
  review.musicRating = dto.musicRating;
  return review;
};