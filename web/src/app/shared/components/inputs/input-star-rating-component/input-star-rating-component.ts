import { Component, input, model } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import { RatingModule } from 'primeng/rating';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-star-rating-component',
  imports: [
    RatingModule,
    AutoFocusModule,
    ReactiveFormsModule,
    FormsModule,
    InputErrorMessageComponent,
  ],
  templateUrl: './input-star-rating-component.html',
  styleUrl: './input-star-rating-component.css',
})
export class InputStarRatingComponent {
  icon = input.required<string>();
  label = input<string | null>(null);
  controlName = input<string | null>(null);
  form = input<FormGroup | null>(null);
  starCount = input.required<number>();
  value = model<unknown>(null);
}
