import { Component, input, model } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-input-date-component',
  standalone: true,
  imports: [IconFieldModule, InputIconModule, FluidModule, ReactiveFormsModule, FormsModule, InputErrorMessageComponent, DatePickerModule],
  templateUrl: './input-date-component.html',
  styleUrls: ['./input-date-component.css'],
})
export class InputDateComponent {
  label = input<string | null>(null);
  icon = input.required<string>();
  controlName = input<string | null>(null);
  placeholder = input.required<string>();
  form = input<FormGroup | null>(null);
  value = model<unknown>(null);
  isRange = input<boolean>(false);
}
