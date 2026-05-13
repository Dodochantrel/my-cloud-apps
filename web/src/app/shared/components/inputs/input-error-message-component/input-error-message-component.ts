import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-error-message-component',
  imports: [],
  templateUrl: './input-error-message-component.html',
  styleUrl: './input-error-message-component.css',
})
export class InputErrorMessageComponent {
  controlName = input.required<string>();
  form = input.required<FormGroup>();

}
