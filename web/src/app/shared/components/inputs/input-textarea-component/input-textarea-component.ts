import { Component, input, model } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-textarea-component',
  imports: [TextareaModule, ReactiveFormsModule, FormsModule, InputErrorMessageComponent],
  templateUrl: './input-textarea-component.html',
  styleUrl: './input-textarea-component.css',
})
export class InputTextareaComponent {
  label = input<string | null>(null);
  icon = input.required<string>();
  controlName = input<string | null>(null);
  placeholder = input.required<string>();
  form = input<FormGroup | null>(null);
  value = model<unknown>(null);
}
