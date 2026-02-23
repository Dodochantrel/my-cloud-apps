import { Component, input } from '@angular/core';
import { Video } from '../../../../core/models/videos/video';

@Component({
  selector: 'app-video-card-component',
  imports: [],
  templateUrl: './video-card-component.html',
  styleUrl: './video-card-component.css',
})
export class VideoCardComponent {
  public video = input.required<Video>();
}
