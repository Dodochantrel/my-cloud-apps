import { effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { Video, VideoType } from '../../../../core/models/videos/video';
import { VideosRoutes } from '../../../../core/api/videos/videos-routes';
import { NotificationService } from '../../../../core/notification/notification-service';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import {
  GetCurrentVideoDto,
  mapFromGetCurrentVideoDtosToVideos,
} from '../../../../core/api/videos/dtos/get-current-video-dto';
import { CurrentVideoStore } from '../../stores/current-video-store';

@Injectable({
  providedIn: 'root',
})
export class CurrentVideoService {
  private readonly videosRoutes = new VideosRoutes();
  public readonly currentVideoStore = inject(CurrentVideoStore);

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
          (error as HttpErrorResponse).message || 'Erreur inconnue',
        );
      }
    });

    effect(() => {
      const resource = this.videosResource.value();
      const videos = resource ? mapFromGetCurrentVideoDtosToVideos(resource) : [];
      this.currentVideoStore.setData(videos);
    });
  }

  private readonly videosResource = httpResource<GetCurrentVideoDto[]>(() =>
    this.videosRoutes.getCurrent(this.page(), this.limit(), this.type()),
  );
  public isLoadingVideos = this.videosResource.isLoading;
}
