import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-header-search-component',
  imports: [FormsModule, InputTextModule, IconFieldModule, InputIconModule, AutoFocusModule],
  templateUrl: './header-search-component.html',
  styleUrl: './header-search-component.css',
})
export class HeaderSearchComponent {
  public input = model.required<string>();
  public label = input.required<string>();
  public icon = input.required<string>();
  public placeholder = input.required<string>();
}
