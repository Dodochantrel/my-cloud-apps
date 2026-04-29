import { ReviewVideoForm } from '../../../../features/videos/forms/review-video-form';
import { VideoType } from '../../../models/videos/video';
import { VideoReview } from '../../../models/videos/video-review';

export interface PatchVideoReviewRequestDto {
  id: string;
  videoType: VideoType;
  isWatched: boolean;
  isToWatch: boolean;
  comment: string | null;
  isFavorite: boolean;
  actingRating: number | null;
  scenarioRating: number | null;
  visualsRating: number | null;
  musicRating: number | null;
}

export const mapFromFormToPatchVideoReviewRequestDto = (
    form: ReviewVideoForm,
): PatchVideoReviewRequestDto => {
  return {
    id: form.controls.id.value!,
    videoType: form.controls.type.value!,
    isWatched: true,
    isToWatch: false,
    comment: form.controls.comment.value,
    isFavorite: form.controls.isFavorite.value,
    actingRating: form.controls.actingRating.value,
    scenarioRating: form.controls.scenarioRating.value,
    visualsRating: form.controls.visualsRating.value,
    musicRating: form.controls.musicRating.value,
  };
};

export interface PatchVideoReviewResponseDto {
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
}

export const mapFromPatchVideoReviewRequestDtoToVideoReview = (
  dto: PatchVideoReviewResponseDto,
): VideoReview => {
  return new VideoReview(dto.id, dto.isWatched, dto.isToWatch, dto.isFavorite);
};
