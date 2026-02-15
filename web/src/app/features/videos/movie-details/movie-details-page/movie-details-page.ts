import { Component, effect, inject } from '@angular/core';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TooltipModule } from 'primeng/tooltip';
import { MovieDetailsService } from '../movie-details-service';
import { VideoInformationComponent } from '../../components/video-information-component/video-information-component';
import { ProviderComponent } from '../../components/provider-component/provider-component';
import { CastingComponent } from '../../components/casting-component/casting-component';
import { VideoDetailComponent } from '../../components/video-detail-component/video-detail-component';

@Component({
  selector: 'app-movie-details-page',
  imports: [DefaultContainerComponent, TooltipModule, VideoInformationComponent, ProviderComponent, CastingComponent, VideoDetailComponent],
  templateUrl: './movie-details-page.html',
  styleUrl: './movie-details-page.css',
})
export class MovieDetailsPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly movieDetailsService = inject(MovieDetailsService);
  
  private readonly id = toSignal(this.route.paramMap);

  constructor() {
    effect(() => {
      const paramMap = this.id();
      const id = paramMap?.get('id');
      if (id) {
        this.movieDetailsService.id.set(id);
      }
    });
  }

  getTrailer() {
    this.movieDetailsService.isVisibleTrailerDialog.set(true);
    this.movieDetailsService.getVideoTrailer();
  }
}
