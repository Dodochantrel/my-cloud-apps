import { Component, input, model } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-select-button-component',
  imports: [SelectButton, ReactiveFormsModule, FormsModule, InputErrorMessageComponent],
  templateUrl: './input-select-button-component.html',
  styleUrl: './input-select-button-component.css',
})
export class InputSelectButtonComponent {
  label = input<string | null>(null);
  controlName = input<string | null>(null);
  options = input.required<{ label: string, value: unknown }[]>();
  form = input<FormGroup | null>(null);
  value = model<unknown>(null);
}
