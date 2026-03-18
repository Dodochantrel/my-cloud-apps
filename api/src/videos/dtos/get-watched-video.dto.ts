import { VideoReview } from '../video-review.entity';

export class GetWatchedVideoResponseDto {
  constructor(videoReview: VideoReview) {}
}

export function toGetWatchedVideoResponseDtoList(
  videoReviews: VideoReview[],
): GetWatchedVideoResponseDto[] {
  return videoReviews.map(
    (videoReview) => new GetWatchedVideoResponseDto(videoReview),
  );
}
