import { VideoReview } from '../video-review.entity';

export class GetToWatchVideoResponseDto {
  constructor(videoReview: VideoReview) {}
}

export function toGetToWatchVideoResponseDtoList(
  videoReviews: VideoReview[],
): GetToWatchVideoResponseDto[] {
  return videoReviews.map(
    (videoReview) => new GetToWatchVideoResponseDto(videoReview),
  );
}
