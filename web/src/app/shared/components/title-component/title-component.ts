import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-title-component',
  imports: [CommonModule],
  templateUrl: './title-component.html',
  styleUrl: './title-component.css',
})
export class TitleComponent {
  styleClass = input.required<TitleStyleAvailable>();
  isCentered = input<boolean>(false);

  get cssClasses(): string {
    switch (this.styleClass()) {
      case 'h1':
        return 'text-6xl font-bold my-2 flex items-center gap-2';
      case 'h2':
        return 'text-2xl font-bold my-2 flex items-center gap-2';
      case 'h3':
        return 'text-xl font-bold my-2 flex items-center gap-2';
      case 'h4':
        return 'text-lg font-bold my-2 flex items-center gap-2';
      default:
        return 'text-xl font-bold my-2 flex items-center gap-2';
    }
  }
}

type TitleStyleAvailable = 'h1' | 'h2' | 'h3' | 'h4';