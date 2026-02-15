import { Component, input } from '@angular/core';
import { TitleComponent } from '../../../../shared/components/title-component/title-component';
import { VideoProvider } from '../../../../core/models/videos/video-provider';

@Component({
  selector: 'app-provider-component',
  imports: [TitleComponent],
  templateUrl: './provider-component.html',
  styleUrl: './provider-component.css',
})
export class ProviderComponent {
  public isLoading = input<boolean>(false);
  public providers = input.required<VideoProvider[]>();
}
