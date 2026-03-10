import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import { RatingModule } from 'primeng/rating';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-star-rating-component',
  imports: [
    RatingModule,
    AutoFocusModule,
    ReactiveFormsModule,
    InputErrorMessageComponent,
  ],
  templateUrl: './input-star-rating-component.html',
  styleUrl: './input-star-rating-component.css',
})
export class InputStarRatingComponent {
  label = input.required<string>();
  icon = input<string | null>(null);
  controlName = input.required<string>();
  form = input.required<FormGroup>();
}
