import { Component, input, model } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputErrorMessageComponent } from '../input-error-message-component/input-error-message-component';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-input-tree-select-component',
  imports: [IconFieldModule, InputIconModule, TreeSelectModule, ReactiveFormsModule, FormsModule, InputErrorMessageComponent],
  templateUrl: './input-tree-select-component.html',
  styleUrl: './input-tree-select-component.css',
})
export class InputTreeSelectComponent {
  label = input<string | null>(null);
  icon = input.required<string>();
  controlName = input<string | null>(null);
  placeholder = input.required<string>();
  options = input.required<TreeNode[]>();
  form = input<FormGroup | null>(null);
  value = model<unknown>(null);
}
