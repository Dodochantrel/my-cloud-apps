import { Component, effect, input, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-header-auto-complete-component',
  imports: [IconFieldModule, InputIconModule, AutoCompleteModule, FormsModule],
  templateUrl: './header-auto-complete-component.html',
  styleUrl: './header-auto-complete-component.css',
})
export class HeaderAutoCompleteComponent {
  public label = input.required<string>();
  public icon = input.required<string>();
  public placeholder = input.required<string>();
  public items = input.required<{ label: string; value: any }[]>();

  public valueSelected = output<any>();
  public searchChange = output<string>();

  value = signal<any>(null);

  constructor () {
  }

  search(event: any) {
    this.searchChange.emit(event.query);
  }

  onSelect(event: any) {
    this.valueSelected.emit(event.value.value);
    this.value.set(null);
  }
}
