import { Component, input, model, output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-multi-select-component',
  imports: [IconFieldModule, InputIconModule, MultiSelectModule, ReactiveFormsModule, FormsModule, InputErrorMessageComponent],
  templateUrl: './input-multi-select-component.html',
  styleUrl: './input-multi-select-component.css',
})
export class InputMultiSelectComponent {
  label = input<string | null>(null);
  icon = input.required<string>();
  controlName = input<string | null>(null);
  placeholder = input.required<string>();
  options = input.required<{ label: string, value: unknown }[]>();
  form = input<FormGroup | null>(null);
  value = model<unknown[]>([]);
  searchChange = output<string>();
  filter = input<boolean>(false);
}
