import { Component, model, output } from '@angular/core';
import { NotificationService } from '../../../core/notification/notification-service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TitleComponent } from '../title-component/title-component';

@Component({
  selector: 'app-auth-form-component',
  imports: [ReactiveFormsModule, ButtonModule, TitleComponent],
  templateUrl: './auth-form-component.html',
  styleUrl: './auth-form-component.css',
})
export class AuthFormComponent {
  header = model.required<string>();
  form = model.required<FormGroup>();
  onCancel = output<void>();
  onValidate = output<void>();

  constructor(private readonly notificationService: NotificationService) {}

  validate() {
    if(this.form().valid) {
      this.onValidate.emit();
    } else {
      this.form().markAllAsTouched();
      this.form().markAllAsDirty();
      this.notificationService.invalidForm();
    }
  }
}
