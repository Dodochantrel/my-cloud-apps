import { effect, inject, Injectable, signal } from '@angular/core';
import { VideoType } from '../../../../core/models/videos/video';
import { VideosRoutes } from '../../../../core/api/videos/videos-routes';
import { ToWatchVideoStore } from '../../stores/to-watch-video-store';
import { NotificationService } from '../../../../core/notification/notification-service';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { GetToWatchVideoDto, mapFromGetToWatchVideoDtosToVideos } from '../../../../core/api/videos/dtos/get-to-watch-video-dto';
import { PaginatedResponseDto } from '../../../../core/api/paginated-reponse-dto';

@Injectable({
  providedIn: 'root',
})
export class ToWatchVideoService {
  private readonly videosRoutes = new VideosRoutes();
  public readonly toWatchVideoStore = inject(ToWatchVideoStore);

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
      const videos = resource ? mapFromGetToWatchVideoDtosToVideos(resource.data) : [];
      this.toWatchVideoStore.setData(videos);
    });
  }

  private readonly videosResource = httpResource<PaginatedResponseDto<GetToWatchVideoDto>>(() =>
    this.videosRoutes.getToWatch(this.page(), this.limit(), this.type()),
  );
  public isLoadingVideos = this.videosResource.isLoading;  
}
