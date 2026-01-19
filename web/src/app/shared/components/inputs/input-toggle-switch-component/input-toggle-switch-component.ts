import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-input-toggle-switch-component',
  imports: [ToggleSwitchModule, ReactiveFormsModule],
  templateUrl: './input-toggle-switch-component.html',
  styleUrl: './input-toggle-switch-component.css',
})
export class InputToggleSwitchComponent {
  label = input.required<string>();
  controlName = input.required<string>();
  form = input.required<FormGroup>();
}
