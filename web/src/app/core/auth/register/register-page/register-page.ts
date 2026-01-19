import { Component } from '@angular/core';
import { AuthFormComponent } from '../../../../shared/components/auth-form-component/auth-form-component';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { InputTextComponent } from '../../../../shared/components/inputs/input-text-component/input-text-component';
import { InputPasswordComponent } from '../../../../shared/components/inputs/input-password-component/input-password-component';
import { mediumRegex } from '../../../../shared/ressources/password-regex';
import { AuthService } from '../../auth-service';

@Component({
  selector: 'app-register-page',
  imports: [AuthFormComponent, InputTextComponent, InputPasswordComponent],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  constructor(private readonly authService: AuthService) {}

  protected form = new FormGroup({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(mediumRegex)] }),
    confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required, this.passwordMatchValidator()] }),
  });

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }
      const password = control.parent.get('password')?.value;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  onSubmit() {
    this.authService.register(
      this.form.get('email')!.value,
      this.form.get('firstName')!.value,
      this.form.get('lastName')!.value,
      this.form.get('password')!.value
    );
  }

  onCancel() {

  }
}
