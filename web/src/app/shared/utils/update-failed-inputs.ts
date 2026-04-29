import { AbstractControl, FormArray, FormGroup } from "@angular/forms";

function markControlAsFailed(control: AbstractControl): void {
  control.markAsTouched({ onlySelf: true });
  control.markAsDirty({ onlySelf: true });

  if (control instanceof FormGroup) {
    Object.keys(control.controls).forEach((field) => {
      const childControl = control.get(field);
      if (childControl) {
        markControlAsFailed(childControl);
      }
    });
  }

  if (control instanceof FormArray) {
    control.controls.forEach((childControl) => {
      markControlAsFailed(childControl);
    });
  }
}

export function updateFailedInputs(form: FormGroup): FormGroup {
  markControlAsFailed(form);
  return form;
}