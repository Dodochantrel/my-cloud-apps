import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-input-radio-button-component',
  imports: [ReactiveFormsModule, RadioButtonModule],
  templateUrl: './input-radio-button-component.html',
  styleUrl: './input-radio-button-component.css',
})
export class InputRadioButtonComponent {
  label = input.required<string>();
  controlName = input.required<string>();
  options = input.required<{ label: string, value: unknown }[]>();
  form = input.required<FormGroup>();
}
