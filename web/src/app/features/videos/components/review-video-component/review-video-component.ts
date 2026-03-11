import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { VideoDetailsService } from '../../video-details/video-details-service';
import { DialogFormComponent } from '../../../../shared/components/dialog-form-component/dialog-form-component';
import { InputStarRatingComponent } from '../../../../shared/components/inputs/input-star-rating-component/input-star-rating-component';
import { DividerModule } from 'primeng/divider';
import { InputTextareaComponent } from '../../../../shared/components/inputs/input-textarea-component/input-textarea-component';
import { initialData, VideoReview, videoReviewSchema } from '../../forms/video-review';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-review-video-component',
  imports: [DialogModule, CommonModule, DialogFormComponent, InputStarRatingComponent, DividerModule, InputTextareaComponent],
  templateUrl: './review-video-component.html',
  styleUrl: './review-video-component.css',
})
export class ReviewVideoComponent {
  protected videoDetailsService = inject(VideoDetailsService);

  protected videoReviewModel = signal<VideoReview>(initialData);
  protected form = form(this.videoReviewModel, videoReviewSchema);

  validate() {}
}
