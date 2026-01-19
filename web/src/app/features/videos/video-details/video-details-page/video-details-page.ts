import { Component, effect, inject } from '@angular/core';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { VideoDetailsService } from '../video-details-service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TitleComponent } from '../../../../shared/components/title-component/title-component';
import { SkeletonModule } from 'primeng/skeleton';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-video-details-page',
  imports: [DefaultContainerComponent, TitleComponent, SkeletonModule, ChipModule],
  templateUrl: './video-details-page.html',
  styleUrl: './video-details-page.css',
})
export class VideoDetailsPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly videoDetailsService = inject(VideoDetailsService);
  
  private readonly id = toSignal(this.route.paramMap);

  constructor() {
    effect(() => {
      const paramMap = this.id();
      const id = paramMap?.get('id');
      if (id) {
        this.videoDetailsService.id.set(id);
      }
    });
  }
}
