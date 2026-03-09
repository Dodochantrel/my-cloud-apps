import { Component, inject, input, model, output } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SafeUrlPipe } from '../../../../shared/pipes/safe-url.pipe';
import { TitleComponent } from '../../../../shared/components/title-component/title-component';
import { Video } from '../../../../core/models/videos/video';
import { VideoDetailsService } from '../../video-details/video-details-service';
import { ReviewVideoComponent } from '../review-video-component/review-video-component';

@Component({
  selector: 'app-video-information-component',
  imports: [SkeletonModule, TagModule, ButtonModule, DialogModule, SafeUrlPipe, TitleComponent, ReviewVideoComponent],
  templateUrl: './video-information-component.html',
  styleUrl: './video-information-component.css',
})
export class VideoInformationComponent {
  public isLoading = input.required<boolean>();
  public isLoadingTrailer = input.required<boolean>();
  public isVisibleTrailerDialog = model.required<boolean>();
  public video = input.required<Video | null>();
  public getTrailer = output<void>();

  protected readonly videoDetailsService = inject(VideoDetailsService);
}
