import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import { RatingModule } from 'primeng/rating';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';
import { Field, FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-input-star-rating-component',
  imports: [
    RatingModule,
    AutoFocusModule,
    ReactiveFormsModule,
    InputErrorMessageComponent,
    Field,
  ],
  templateUrl: './input-star-rating-component.html',
  styleUrl: './input-star-rating-component.css',
})
export class InputStarRatingComponent {
  label = input.required<string>();
  icon = input<string | null>(null);
  field = input.required<FieldState<number, string>>();
}
