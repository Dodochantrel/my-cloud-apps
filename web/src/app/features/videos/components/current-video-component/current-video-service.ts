import { effect, Injectable, linkedSignal, signal } from '@angular/core';
import { Video, VideoType } from '../../../../core/models/videos/video';
import { VideosRoutes } from '../../../../core/api/videos/videos-routes';
import { NotificationService } from '../../../../core/notification/notification-service';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import {
  GetCurrentVideoDto,
  mapFromGetCurrentVideoDtosToVideos,
} from '../../../../core/api/videos/dtos/get-current-video-dto';

@Injectable({
  providedIn: 'root',
})
export class CurrentVideoService {
  private readonly videosRoutes = new VideosRoutes();
  
  public type = signal<VideoType>('movie');
  public page = signal<number>(1);
  public limit = signal<number>(20);

  constructor(private readonly notificationService: NotificationService) {
    // Afficher les erreurs
    effect(() => {
      const error = this.videosResource.error();
      if (error) {
        this.notificationService.error(
          'Erreur lors du chargement des vidéos',
          (error as HttpErrorResponse).message || 'Erreur inconnue'
        );
      }
    });
  }

  private readonly videosResource = httpResource<GetCurrentVideoDto[]>(
    () =>
      this.videosRoutes.getCurrent(
        this.page(), this.limit(), this.type()
      )
  );

  videos = linkedSignal<Video[]>(() => {
    const resource = this.videosResource.value();
    return resource ? mapFromGetCurrentVideoDtosToVideos(resource) : [];
  });
  public isLoadingVideos = this.videosResource.isLoading;
}
