import { Component, input, model } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FluidModule } from 'primeng/fluid';

@Component({
  selector: 'app-input-price-component',
  imports: [
    IconFieldModule,
    InputIconModule,
    ReactiveFormsModule,
    FormsModule,
    InputErrorMessageComponent,
    InputNumberModule,
    FluidModule,
  ],
  templateUrl: './input-price-component.html',
  styleUrl: './input-price-component.css',
})
export class InputPriceComponent {
  label = input<string | null>(null);
  icon = input.required<string>();
  controlName = input<string | null>(null);
  placeholder = input.required<string>();
  form = input<FormGroup | null>(null);
  value = model<unknown>(null);
}
