import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { VideoDetailsService } from '../../video-details/video-details-service';
import { DialogFormComponent } from '../../../../shared/components/dialog-form-component/dialog-form-component';
import { FormControl, FormGroup } from '@angular/forms';
import { InputStarRatingComponent } from '../../../../shared/components/inputs/input-star-rating-component/input-star-rating-component';

@Component({
  selector: 'app-review-video-component',
  imports: [DialogModule, CommonModule, DialogFormComponent, InputStarRatingComponent],
  templateUrl: './review-video-component.html',
  styleUrl: './review-video-component.css',
})
export class ReviewVideoComponent {
  protected videoDetailsService = inject(VideoDetailsService);

  protected form = new FormGroup({
    id: new FormControl('', { nonNullable: true }),
    actingRating: new FormControl(0, { nonNullable: true }),
    scenarioRating: new FormControl(0, { nonNullable: true }),
    musicRating: new FormControl(0, { nonNullable: true }),
    generalRating: new FormControl(0, { nonNullable: true }),
  });

  validate() {}
}
