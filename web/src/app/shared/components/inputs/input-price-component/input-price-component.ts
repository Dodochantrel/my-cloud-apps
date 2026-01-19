import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FluidModule } from 'primeng/fluid';

@Component({
  selector: 'app-input-price-component',
  imports: [IconFieldModule, InputIconModule, ReactiveFormsModule, InputErrorMessageComponent, InputNumberModule, FluidModule],
  templateUrl: './input-price-component.html',
  styleUrl: './input-price-component.css',
})
export class InputPriceComponent {
  label = input.required<string>();
  icon = input.required<string>();
  controlName = input.required<string>();
  placeholder = input.required<string>();
  form = input.required<FormGroup>();
}
