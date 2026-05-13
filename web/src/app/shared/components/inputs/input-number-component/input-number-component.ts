import { Component, input, model } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-number-component',
  imports: [
    IconFieldModule,
    InputIconModule,
    ReactiveFormsModule,
    FormsModule,
    InputErrorMessageComponent,
    InputNumberModule,
    FluidModule,
  ],
  templateUrl: './input-number-component.html',
  styleUrl: './input-number-component.css',
})
export class InputNumberComponent {
  label = input<string | null>(null);
  icon = input.required<string>();
  controlName = input<string | null>(null);
  placeholder = input.required<string>();
  form = input<FormGroup | null>(null);
  value = model<unknown>(null);
  mode = input<'decimal' | 'currency' | 'percent'>('decimal');
}
