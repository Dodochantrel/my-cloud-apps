import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { VideosRoutes } from '../../../core/api/videos/videos-routes';
import { NotificationService } from '../../../core/notification/notification-service';
import { mapFromGetAllVideoDtosToVideos } from '../../../core/api/videos/dtos/get-all-video-dto';
import { VideoType } from '../../../core/models/videos/video';
import { VideoStore } from '../stores/video-store';

@Injectable({
  providedIn: 'root',
})
export class VideoListService {
  public search = signal<string>('');
  public page = signal<number>(1);
  public limit = signal<number>(20);
  public type = signal<VideoType>('movie');

  private readonly videosRoutes = new VideosRoutes();
  public readonly videoStore = inject(VideoStore);

  constructor(private readonly notificationService: NotificationService) {
    // Quand search change, passer à la page 1
    effect(() => {
      this.search();
      this.page.set(1);
    });

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
    
    effect(() => {
      const resource = this.videosResource.value();
      const videos = resource ? mapFromGetAllVideoDtosToVideos(resource) : [];
      this.videoStore.setData(videos);
    });
  }

  private readonly videosResource = httpResource<any>(
    () =>
      this.videosRoutes.getAll(
        this.search(),
        this.type()
      )
  );
  public isLoadingVideos = this.videosResource.isLoading;
}
