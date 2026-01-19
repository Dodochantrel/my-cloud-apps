import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-date-component',
  standalone: true,
  imports: [IconFieldModule, InputIconModule, FluidModule, ReactiveFormsModule, InputErrorMessageComponent],
  templateUrl: './input-date-component.html',
  styleUrls: ['./input-date-component.css'],
})
export class InputDateComponent {
  label = input.required<string>();
  icon = input.required<string>();
  controlName = input.required<string>();
  placeholder = input.required<string>();
  form = input.required<FormGroup>();
}
