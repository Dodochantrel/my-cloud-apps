import { Component, input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
  selector: 'app-input-mask-component',
  imports: [
    InputTextModule,
    InputMaskModule,
    InputErrorMessageComponent,
    ReactiveFormsModule,
    InputIconModule,
    IconFieldModule,
  ],
  templateUrl: './input-mask-component.html',
  styleUrl: './input-mask-component.css',
})
export class InputMaskComponent {
  label = input<string | null>(null);
  icon = input.required<string>();
  controlName = input.required<string>();
  placeholder = input.required<string>();
  form = input.required<FormGroup>();
  inputMask = input.required<string>();
}
