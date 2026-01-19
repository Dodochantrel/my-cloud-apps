import { Injectable, linkedSignal, signal } from '@angular/core';
import { VideosRoutes } from '../../../core/api/videos/videos-routes';
import { httpResource } from '@angular/common/http';
import { GetOneVideoDto, mapFromGetOneVideoDtoToVideo } from '../../../core/api/videos/dtos/get-one-video-dto';

@Injectable({
  providedIn: 'root',
})
export class VideoDetailsService {
  private readonly videosRoutes = new VideosRoutes();

  public id = signal<string | null>(null);

  private readonly videoResource = httpResource<GetOneVideoDto>(
    () =>
      this.id() ? this.videosRoutes.getOne(
        this.id()!
      ) : ''
  );

  video = linkedSignal(() => {
    const resource = this.videoResource.value();
    return resource ? mapFromGetOneVideoDtoToVideo(resource) : null;
  });
  public isLoadingVideos = this.videoResource.isLoading;
}
