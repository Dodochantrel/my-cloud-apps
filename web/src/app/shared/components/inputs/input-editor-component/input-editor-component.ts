import { Component, input, model } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-editor-component',
  imports: [EditorModule, ReactiveFormsModule, FormsModule, InputErrorMessageComponent],
  templateUrl: './input-editor-component.html',
  styleUrl: './input-editor-component.css',
})
export class InputEditorComponent {
  label = input<string | null>(null);
  controlName = input<string | null>(null);
  placeholder = input.required<string>();
  form = input<FormGroup | null>(null);
  value = model<unknown>(null);
}
