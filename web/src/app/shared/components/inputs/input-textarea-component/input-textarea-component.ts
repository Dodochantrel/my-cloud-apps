import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-textarea-component',
  imports: [TextareaModule, ReactiveFormsModule, InputErrorMessageComponent],
  templateUrl: './input-textarea-component.html',
  styleUrl: './input-textarea-component.css',
})
export class InputTextareaComponent {
  label = input.required<string>();
  icon = input.required<string>();
  controlName = input.required<string>();
  placeholder = input.required<string>();
  form = input.required<FormGroup>();
}
