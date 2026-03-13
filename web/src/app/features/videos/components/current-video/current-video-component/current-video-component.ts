import { Component, effect, input } from '@angular/core';
import { VideoType } from '../../../../../core/models/videos/video';
import { VideoCardComponent } from '../../video-card-component/video-card-component';
import { CurrentVideoService } from '../current-video-service';

@Component({
  selector: 'app-current-video-component',
  imports: [VideoCardComponent],
  templateUrl: './current-video-component.html',
  styleUrl: './current-video-component.css',
})
export class CurrentVideoComponent {
  public type = input.required<VideoType>();

  constructor(
    protected readonly currentVideoService: CurrentVideoService,
  ) {
    effect(() => {
      this.currentVideoService.type.set(this.type());
    });
  }
}
