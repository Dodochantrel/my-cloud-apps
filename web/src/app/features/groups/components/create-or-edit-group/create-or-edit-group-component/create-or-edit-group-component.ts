import { NotificationService } from './../../../../../core/notification/notification-service';
import { Component, inject, input, model } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogFormComponent } from '../../../../../shared/components/dialog-form-component/dialog-form-component';
import { createCreateOrEditGroupForm } from '../../../forms/create-or-edit-group-form';
import { updateFailedInputs } from '../../../../../shared/utils/update-failed-inputs';
import { InputTextComponent } from "../../../../../shared/components/inputs/input-text-component/input-text-component";
import { InputAutoCompleteComponent } from '../../../../../shared/components/inputs/input-auto-complete-component/input-auto-complete-component';

@Component({
  selector: 'app-create-or-edit-group-component',
  imports: [ReactiveFormsModule, DialogFormComponent, InputTextComponent, InputAutoCompleteComponent],
  templateUrl: './create-or-edit-group-component.html',
  styleUrl: './create-or-edit-group-component.css',
})
export class CreateOrEditGroupComponent {
  public isDisplay = model.required<boolean>();
  public isCreating = input.required<boolean>();

  private readonly notificationService = inject(NotificationService);

  protected form = createCreateOrEditGroupForm();

  cancel() {
    this.form.reset();
    this.isDisplay.set(false);
  }

  save() {
    if (this.form.valid) {
      // Perform save operation
    } else {
      updateFailedInputs(this.form);
      this.notificationService.invalidForm();
    }
  }
}
