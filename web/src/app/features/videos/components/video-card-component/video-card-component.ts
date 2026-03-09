import { ButtonModule } from 'primeng/button';
import { Component, input } from '@angular/core';
import { Video } from '../../../../core/models/videos/video';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-video-card-component',
  imports: [ButtonModule, CommonModule, RouterLink],
  templateUrl: './video-card-component.html',
  styleUrl: './video-card-component.css',
})
export class VideoCardComponent {
  public video = input.required<Video>();

  redirectToVideoDetails(id: string) {
    return ['/videos/details', id];
  }
}
