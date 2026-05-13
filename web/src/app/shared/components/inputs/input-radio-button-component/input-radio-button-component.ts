import { Component, input, model } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-radio-button-component',
  imports: [ReactiveFormsModule, FormsModule, RadioButtonModule, InputErrorMessageComponent],
  templateUrl: './input-radio-button-component.html',
  styleUrl: './input-radio-button-component.css',
})
export class InputRadioButtonComponent {
  label = input<string | null>(null);
  controlName = input<string | null>(null);
  options = input.required<{ label: string, value: unknown }[]>();
  form = input<FormGroup | null>(null);
  value = model<unknown>(null);
}
