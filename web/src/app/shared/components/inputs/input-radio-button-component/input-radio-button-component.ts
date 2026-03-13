import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-radio-button-component',
  imports: [ReactiveFormsModule, RadioButtonModule, InputErrorMessageComponent],
  templateUrl: './input-radio-button-component.html',
  styleUrl: './input-radio-button-component.css',
})
export class InputRadioButtonComponent {
  label = input.required<string>();
  controlName = input.required<string>();
  options = input.required<{ label: string, value: unknown }[]>();
  form = input.required<FormGroup>();
}
