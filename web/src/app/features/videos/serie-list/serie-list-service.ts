import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { effect, Injectable, linkedSignal, signal } from '@angular/core';
import { VideosRoutes } from '../../../core/api/videos/videos-routes';
import { NotificationService } from '../../../core/notification/notification-service';
import { mapFromGetAllVideoDtosToVideos } from '../../../core/api/videos/dtos/get-all-video-dto';

@Injectable({
  providedIn: 'root',
})
export class SerieListService {
  public search = signal<string>('');
  public page = signal<number>(1);
  public limit = signal<number>(20);

  private readonly videosRoutes = new VideosRoutes();

  constructor(
    private readonly notificationService: NotificationService
  ) {
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
  }

  private readonly videosResource = httpResource<any>(
    () =>
      this.videosRoutes.getAll(
        this.search(), this.page(), this.limit(), 'serie'
      )
  );

  videos = linkedSignal(() => {
    const resource = this.videosResource.value();
    return resource ? mapFromGetAllVideoDtosToVideos(resource) : [];
  });
  public isLoadingVideos = this.videosResource.isLoading;
}
