import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChild, effect, input, model, output, TemplateRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AutoFocusModule } from 'primeng/autofocus';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';

@Component({
  selector: 'app-input-auto-complete-component',
  imports: [
    NgTemplateOutlet,
    AutoCompleteModule,
    IconFieldModule,
    InputIconModule,
    AutoFocusModule,
    ReactiveFormsModule,
    InputErrorMessageComponent,
    FormsModule,
  ],
  templateUrl: './input-auto-complete-component.html',
  styleUrl: './input-auto-complete-component.css',
})
export class InputAutoCompleteComponent {
  label = input<string | null>(null);
  icon = input.required<string>();
  controlName = input<string | null>(null);
  placeholder = input.required<string>();
  form = input<FormGroup | null>(null);
  items = input.required<{ label: string; value: any }[]>();
  value = model<unknown>(null);
  customItemTemplate = contentChild<TemplateRef<any>>('itemTemplate');
  searchChange = output<string>();
  valueSelected = output<any>();

  search(event: any) {
    this.searchChange.emit(event.query);
  }

  onSelect(event: any) {
    this.valueSelected.emit(event.value.value);
    this.value.set(null);
  }

  
}
