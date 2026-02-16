import { Component, effect, inject } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { DefaultContainerComponent } from '../../../../shared/components/default-container-component/default-container-component';
import { CastingComponent } from '../../components/casting-component/casting-component';
import { ProviderComponent } from '../../components/provider-component/provider-component';
import { VideoDetailComponent } from '../../components/video-detail-component/video-detail-component';
import { VideoInformationComponent } from '../../components/video-information-component/video-information-component';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { serieDetailsService } from '../serie-details-service';
import { SeasonComponent } from '../../components/season-component/season-component';

@Component({
  selector: 'app-serie-details-page',
  imports: [DefaultContainerComponent, TooltipModule, VideoInformationComponent, ProviderComponent, CastingComponent, VideoDetailComponent, SeasonComponent],
  templateUrl: './serie-details-page.html',
  styleUrl: './serie-details-page.css',
})
export class SerieDetailsPage {
private readonly route = inject(ActivatedRoute);
  protected readonly serieDetailsService = inject(serieDetailsService);
  
  private readonly id = toSignal(this.route.paramMap);

  constructor() {
    effect(() => {
      const paramMap = this.id();
      const id = paramMap?.get('id');
      if (id) {
        this.serieDetailsService.id.set(id);
      }
    });
  }

  getTrailer() {
    this.serieDetailsService.isVisibleTrailerDialog.set(true);
    this.serieDetailsService.getVideoTrailer();
  }
}
