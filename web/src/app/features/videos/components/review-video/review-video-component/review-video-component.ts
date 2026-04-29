import { CommonModule } from '@angular/common';
import { Component, effect, inject, model } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DialogFormComponent } from '../../../../../shared/components/dialog-form-component/dialog-form-component';
import { InputStarRatingComponent } from '../../../../../shared/components/inputs/input-star-rating-component/input-star-rating-component';
import { DividerModule } from 'primeng/divider';
import { InputTextareaComponent } from '../../../../../shared/components/inputs/input-textarea-component/input-textarea-component';
import { createReviewVideoForm } from '../../../forms/review-video-form';
import { InputToggleSwitchComponent } from '../../../../../shared/components/inputs/input-toggle-switch-component/input-toggle-switch-component';
import { Video } from '../../../../../core/models/videos/video';
import { ReviewVideoService } from '../review-video-service';

@Component({
  selector: 'app-review-video-component',
  imports: [
    DialogModule,
    CommonModule,
    DialogFormComponent,
    InputStarRatingComponent,
    DividerModule,
    InputTextareaComponent,
    InputToggleSwitchComponent,
  ],
  templateUrl: './review-video-component.html',
  styleUrl: './review-video-component.css',
})
export class ReviewVideoComponent {
  video = model.required<Video>();
  isOpen = model.required<boolean>();

  constructor() {
    effect(() => {
      if (this.video()) {
        this.form.patchValue({
          id: this.video().id,
          type: this.video().type,
          actingRating: this.video().review?.actingRating,
          scenarioRating: this.video().review?.scenarioRating,
          musicRating: this.video().review?.musicRating,
          visualsRating: this.video().review?.visualsRating,
          comment: this.video().review?.comment,
          isFavorite: this.video().review?.isFavorite,
        })
      }
    });
  }

  protected form = createReviewVideoForm();

  private readonly reviewVideoService = inject(ReviewVideoService);

  validate() {
    this.reviewVideoService.save(this.form, () => this.isOpen.set(false));
  }

  get averageScore() {
    const values = [
      this.form.get('actingRating')?.value,
      this.form.get('scenarioRating')?.value,
      this.form.get('musicRating')?.value,
      this.form.get('visualsRating')?.value,
    ];
    const validValues = values.filter((v) => v !== null && v !== undefined);
    if (validValues.length === 0) return 0;
    const sum = validValues.reduce((acc, val) => acc + val, 0);
    return ((sum / validValues.length) * 2).toFixed(1);
  }
}
