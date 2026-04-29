import { Component, input, model } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-text-component',
  imports: [
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    AutoFocusModule,
    ReactiveFormsModule,
    FormsModule,
    InputErrorMessageComponent,
  ],
  templateUrl: './input-text-component.html',
  styleUrl: './input-text-component.css',
})
export class InputTextComponent {
  label = input<string | null>(null);
  icon = input.required<string>();
  controlName = input<string | null>(null);
  placeholder = input.required<string>();
  form = input<FormGroup | null>(null);
  value = model<unknown>(null);
}
