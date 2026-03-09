import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TooltipModule } from 'primeng/tooltip';
import { VideoDetailsService } from '../video-details-service';
import { VideoInformationComponent } from '../../components/video-information-component/video-information-component';
import { ProviderComponent } from '../../components/provider-component/provider-component';
import { CastingComponent } from '../../components/casting-component/casting-component';
import { VideoDetailComponent } from '../../components/video-detail-component/video-detail-component';
import { SeasonComponent } from '../../components/season-component/season-component';
import { VideoType } from '../../../../core/models/videos/video';

@Component({
  selector: 'app-video-details-page',
  imports: [
    DefaultContainerComponent,
    TooltipModule,
    VideoInformationComponent,
    ProviderComponent,
    CastingComponent,
    VideoDetailComponent,
    SeasonComponent,
    CommonModule,
  ],
  templateUrl: './video-details-page.html',
  styleUrl: './video-details-page.css',
})
export class VideoDetailsPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly videoDetailsService = inject(VideoDetailsService);

  private readonly id = toSignal(this.route.paramMap);
  private readonly queryParams = toSignal(this.route.queryParamMap);

  constructor() {
    effect(() => {
      const paramMap = this.id();
      const id = paramMap?.get('id');
      if (id) {
        this.videoDetailsService.id.set(id);
      }
    });

    effect(() => {
      const paramMap = this.queryParams();
      const type = this.normalizeType(paramMap?.get('type')) ?? 'movie';

      if (type !== this.videoDetailsService.type()) {
        this.videoDetailsService.type.set(type);
      }

      const currentType = this.normalizeType(this.route.snapshot.queryParams['type']) ?? 'movie';
      if (type === currentType) return;

      this.router.navigate([], {
        queryParams: { type },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  get isSerie(): boolean {
    return this.videoDetailsService.type() === 'serie';
  }

  getTrailer() {
    this.videoDetailsService.isVisibleTrailerDialog.set(true);
    this.videoDetailsService.getVideoTrailer();
  }

  private normalizeType(type: string | null | undefined): VideoType | null {
    if (type === 'movie' || type === 'serie') return type;
    return null;
  }
}
