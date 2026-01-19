import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
  selector: 'app-input-select-button-component',
  imports: [SelectButton, ReactiveFormsModule],
  templateUrl: './input-select-button-component.html',
  styleUrl: './input-select-button-component.css',
})
export class InputSelectButtonComponent {
  label = input.required<string>();
  controlName = input.required<string>();
  options = input.required<{ label: string, value: unknown }[]>();
  form = input.required<FormGroup>();
}
