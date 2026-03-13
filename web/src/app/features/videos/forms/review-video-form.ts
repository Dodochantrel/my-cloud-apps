import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VideoType } from '../../../core/models/videos/video';

export type ReviewVideoFormModel = {
  id: FormControl<string>;
  type: FormControl<VideoType>;
  actingRating: FormControl<number | null>;
  scenarioRating: FormControl<number | null>;
  musicRating: FormControl<number | null>;
  visualsRating: FormControl<number | null>;
  comment: FormControl<string | null>;
  isFavorite: FormControl<boolean>;
};

export type ReviewVideoForm = FormGroup<ReviewVideoFormModel>;

export function createReviewVideoForm(): ReviewVideoForm {
  return new FormGroup<ReviewVideoFormModel>({
    id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    type: new FormControl('movie' as const, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    actingRating: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    scenarioRating: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    musicRating: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    visualsRating: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    comment: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    isFavorite: new FormControl(false, {
      nonNullable: true,
    }),
  });
}
