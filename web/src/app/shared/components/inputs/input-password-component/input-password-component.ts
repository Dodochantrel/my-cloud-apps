import { Component, input, model } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { mediumRegex, strongRegex } from '../../../ressources/password-regex';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-input-password-component',
  imports: [DividerModule, ReactiveFormsModule, FormsModule, IconFieldModule, InputIconModule, InputErrorMessageComponent, PasswordModule, RouterLink],
  templateUrl: './input-password-component.html',
  styleUrl: './input-password-component.css',
})
export class InputPasswordComponent {
  label = input<string | null>(null);
  icon = input.required<string>();
  controlName = input<string | null>(null);
  placeholder = input.required<string>();
  form = input<FormGroup | null>(null);
  value = model<unknown>(null);
  needRules = input<boolean>(false);
  needForgetPasswordLink = input<boolean>(false);

  get hasLowercase(): boolean {
    const value = this.form()!.get(this.controlName()!)?.value || '';
    return /[a-z]/.test(value);
  }

  get hasUppercase(): boolean {
    const value = this.form()!.get(this.controlName()!)?.value || '';
    return /[A-Z]/.test(value);
  }

  get hasNumber(): boolean {
    const value = this.form()!.get(this.controlName()!)?.value || '';
    return /[0-9]/.test(value);
  }

  get hasMinLength(): boolean {
    const value = this.form()!.get(this.controlName()!)?.value || '';
    return value.length >= 12;
  }

  get hasSpecialChar(): boolean {
    const value = this.form()!.get(this.controlName()!)?.value || '';
    return /[!@#$%^&*(),.?":{}|<>]/.test(value);
  }

  protected mediumRegex = mediumRegex;
  protected strongRegex = strongRegex;
}
