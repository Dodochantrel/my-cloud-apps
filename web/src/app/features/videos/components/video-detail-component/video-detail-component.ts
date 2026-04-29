import { Component, input } from '@angular/core';
import { TitleComponent } from '../../../../shared/components/title-component/title-component';
import { Video } from '../../../../core/models/videos/video';

@Component({
  selector: 'app-video-detail-component',
  imports: [TitleComponent],
  templateUrl: './video-detail-component.html',
  styleUrl: './video-detail-component.css',
})
export class VideoDetailComponent {
  public video = input.required<Video | null>();
}
