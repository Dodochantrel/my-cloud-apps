import { effect, inject, Injectable, signal } from '@angular/core';
import { WatchedVideoStore } from '../../stores/watched-video-store';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { VideosRoutes } from '../../../../core/api/videos/videos-routes';
import { VideoType } from '../../../../core/models/videos/video';
import { NotificationService } from '../../../../core/notification/notification-service';
import { PaginatedResponseDto } from '../../../../core/api/paginated-reponse-dto';
import { GetWatchedVideoDto, mapFromGetWatchedVideoDtosToVideos } from '../../../../core/api/videos/dtos/get-watched-video-dto';

@Injectable({
  providedIn: 'root',
})
export class WatchedVideoService {
  private readonly videosRoutes = new VideosRoutes();
  public readonly watchedVideoStore = inject(WatchedVideoStore);

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
      const videos = resource ? mapFromGetWatchedVideoDtosToVideos(resource.data) : [];
      this.watchedVideoStore.setData(videos);
    });
  }

  private readonly videosResource = httpResource<PaginatedResponseDto<GetWatchedVideoDto>>(() =>
    this.videosRoutes.getWatched(this.page(), this.limit(), this.type()),
  );
  public isLoadingVideos = this.videosResource.isLoading;
}
