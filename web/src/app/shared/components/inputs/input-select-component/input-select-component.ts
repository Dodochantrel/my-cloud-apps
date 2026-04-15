import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-select-component',
  imports: [IconFieldModule, InputIconModule, SelectModule, ReactiveFormsModule, InputErrorMessageComponent],
  templateUrl: './input-select-component.html',
  styleUrl: './input-select-component.css',
})
export class InputSelectComponent {
  label = input<string | null>(null);
  icon = input.required<string>();
  controlName = input.required<string>();
  placeholder = input.required<string>();
  options = input.required<{ label: string, value: unknown }[]>();
  form = input.required<FormGroup>();
}
