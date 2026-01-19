import { Component } from '@angular/core';
import { AuthFormComponent } from '../../../../shared/components/auth-form-component/auth-form-component';
import { InputPasswordComponent } from '../../../../shared/components/inputs/input-password-component/input-password-component';
import { InputTextComponent } from '../../../../shared/components/inputs/input-text-component/input-text-component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth-service';
import { InputToggleSwitchComponent } from '../../../../shared/components/inputs/input-toggle-switch-component/input-toggle-switch-component';

@Component({
  selector: 'app-login-page',
  imports: [AuthFormComponent, InputTextComponent, InputPasswordComponent, InputToggleSwitchComponent],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  constructor(private readonly authService: AuthService) {}

  protected form = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
    rememberMe: new FormControl(false, { nonNullable: true }),
  });

  onSubmit() {
    this.authService.login(
      this.form.get('email')!.value,
      this.form.get('password')!.value,
      true
    );
  }

  onCancel() {

  }
}
