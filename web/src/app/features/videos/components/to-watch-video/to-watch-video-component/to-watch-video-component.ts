import { Component, effect, input } from '@angular/core';
import { ToWatchVideoService } from '../to-watch-video-service';
import { VideoType } from '../../../../../core/models/videos/video';
import { VideoCardComponent } from '../../video-card/video-card-component/video-card-component';

@Component({
  selector: 'app-to-watch-video-component',
  imports: [VideoCardComponent],
  templateUrl: './to-watch-video-component.html',
  styleUrl: './to-watch-video-component.css',
})
export class ToWatchVideoComponent {
  public type = input.required<VideoType>();

  constructor(
    protected readonly toWatchVideoService: ToWatchVideoService,
  ) {
    effect(() => {
      this.toWatchVideoService.type.set(this.type());
    });
  }
}
