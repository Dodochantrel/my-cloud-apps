import { Component, input, model } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-input-toggle-switch-component',
  imports: [ToggleSwitchModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input-toggle-switch-component.html',
  styleUrl: './input-toggle-switch-component.css',
})
export class InputToggleSwitchComponent {
  label = input<string | null>(null);
  controlName = input<string | null>(null);
  form = input<FormGroup | null>(null);
  value = model<unknown>(null);
}
