import { required, schema } from '@angular/forms/signals';

export interface VideoReview {
  id: string;
  actingRating: number;
  scenarioRating: number;
  musicRating: number;
  effectsRating: number;
  generalRating: number;
  comment: string;
}

export const initialData: VideoReview = {
  id: '',
  actingRating: 0,
  scenarioRating: 0,
  musicRating: 0,
  effectsRating: 0,
  generalRating: 0,
  comment: '',
};

export const videoReviewSchema = schema<VideoReview>((rootPath) => {
    required(rootPath.id, { message: 'L\'identifiant de la vidéo est requis' });
});