import { Component, effect, input, model, signal } from '@angular/core';
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
  debounceTime = input<number>(300);

  internalValue = signal<unknown>(null);
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private isDebouncing = false;

  constructor() {
    effect(() => {
      const v = this.value();
      if (!this.isDebouncing) {
        this.internalValue.set(v);
      }
    });
  }

  onInputChange(newValue: unknown): void {
    this.isDebouncing = true;
    this.internalValue.set(newValue);

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.value.set(newValue);
      this.isDebouncing = false;
    }, this.debounceTime());
  }
}
