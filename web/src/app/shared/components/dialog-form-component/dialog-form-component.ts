import { Component, input, model, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { updateFailedInputs } from '../../utils/update-failed-inputs';
import { NotificationService } from '../../../core/notification/notification-service';

@Component({
  selector: 'app-dialog-form-component',
  imports: [DialogModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './dialog-form-component.html',
  styleUrl: './dialog-form-component.css',
})
export class DialogFormComponent {
  isDisplay = model.required<boolean>();
  header = input.required<string>();
  form = model.required<FormGroup>();
  onCancel = output<void>();
  onValidate = output<void>();

  constructor(private readonly notificationService: NotificationService) {}

  validate() {
    if(this.form().valid) {
      this.onValidate.emit();
    } else {
      updateFailedInputs(this.form());
      this.notificationService.invalidForm();
    }
  }
}
