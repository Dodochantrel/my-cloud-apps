import { Component, model } from '@angular/core';
import { TitleComponent } from '../title-component/title-component';

@Component({
  selector: 'app-default-container-component',
  imports: [TitleComponent],
  templateUrl: './default-container-component.html',
  styleUrl: './default-container-component.css',
})
export class DefaultContainerComponent {
  title = model<string | null>(null);
}
