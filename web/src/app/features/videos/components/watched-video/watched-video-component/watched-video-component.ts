import { Component, effect, input } from '@angular/core';
import { VideoType } from '../../../../../core/models/videos/video';
import { VideoCardComponent } from '../../video-card/video-card-component/video-card-component';
import { WatchedVideoService } from '../watched-video-service';

@Component({
  selector: 'app-watched-video-component',
  imports: [VideoCardComponent],
  templateUrl: './watched-video-component.html',
  styleUrl: './watched-video-component.css',
})
export class WatchedVideoComponent {
  public type = input.required<VideoType>();

  constructor(
    protected readonly watchedVideoService: WatchedVideoService,
  ) {
    effect(() => {
      this.watchedVideoService.type.set(this.type());
    });
  }
}
