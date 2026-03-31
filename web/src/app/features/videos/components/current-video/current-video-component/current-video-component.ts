import { Component, effect, input } from '@angular/core';
import { VideoType } from '../../../../../core/models/videos/video';
import { VideoCardComponent } from '../../video-card/video-card-component/video-card-component';
import { CurrentVideoService } from '../current-video-service';
import { MovieLoaderComponent } from '../../../../../shared/components/loaders/movie-loader-component/movie-loader-component';

@Component({
  selector: 'app-current-video-component',
  imports: [VideoCardComponent, MovieLoaderComponent],
  templateUrl: './current-video-component.html',
  styleUrl: './current-video-component.css',
})
export class CurrentVideoComponent {
  public type = input.required<VideoType>();
  public isLoading = input.required<boolean>();

  constructor(
    protected readonly currentVideoService: CurrentVideoService,
  ) {
    effect(() => {
      this.currentVideoService.type.set(this.type());
    });
  }
}
