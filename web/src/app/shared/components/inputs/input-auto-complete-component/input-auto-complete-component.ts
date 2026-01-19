import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AutoFocusModule } from 'primeng/autofocus';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-auto-complete-component',
  imports: [
    AutoCompleteModule,
    IconFieldModule,
    InputIconModule,
    AutoFocusModule,
    ReactiveFormsModule,
    InputErrorMessageComponent,
  ],
  templateUrl: './input-auto-complete-component.html',
  styleUrl: './input-auto-complete-component.css',
})
export class InputAutoCompleteComponent {
  label = input.required<string>();
  icon = input.required<string>();
  controlName = input.required<string>();
  placeholder = input.required<string>();
  form = input.required<FormGroup>();
  items = input.required<any[]>();
}
