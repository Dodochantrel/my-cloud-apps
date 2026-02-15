import { Component, input, model, output } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SafeUrlPipe } from '../../../../shared/pipes/safe-url.pipe';
import { TitleComponent } from '../../../../shared/components/title-component/title-component';
import { Video } from '../../../../core/models/videos/video';

@Component({
  selector: 'app-video-information-component',
  imports: [SkeletonModule, TagModule, ButtonModule, DialogModule, SafeUrlPipe, TitleComponent],
  templateUrl: './video-information-component.html',
  styleUrl: './video-information-component.css',
})
export class VideoInformationComponent {
  public isLoading = input.required<boolean>();
  public isLoadingTrailer = input.required<boolean>();
  public isVisibleTrailerDialog = model.required<boolean>();
  public video = input.required<Video | null>();
  public getTrailer = output<void>();
}
