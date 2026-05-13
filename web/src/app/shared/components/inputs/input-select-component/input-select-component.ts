import { Component, input, model, output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-select-component',
  imports: [IconFieldModule, InputIconModule, SelectModule, ReactiveFormsModule, FormsModule, InputErrorMessageComponent],
  templateUrl: './input-select-component.html',
  styleUrl: './input-select-component.css',
})
export class InputSelectComponent {
  label = input<string | null>(null);
  icon = input.required<string>();
  controlName = input<string | null>(null);
  placeholder = input.required<string>();
  options = input.required<InputSelectOption[]>();
  form = input<FormGroup | null>(null);
  value = model<unknown>(null);
  searchChange = output<string>();
  filter = input<boolean>(false);
  canMultiple = input<boolean>(false);
  isLoading = input<boolean>(false);
}

export interface InputSelectOption {
  label: string;
  value: unknown; 
}
