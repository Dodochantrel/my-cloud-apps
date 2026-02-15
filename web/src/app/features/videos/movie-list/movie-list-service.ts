import { effect, Injectable, linkedSignal, signal } from '@angular/core';
import { VideosRoutes } from '../../../core/api/videos/videos-routes';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { NotificationService } from '../../../core/notification/notification-service';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  public search = signal<any>(null);
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
        this.search(), this.page(), this.limit(), 'movie'
      )
  );

  videos = linkedSignal(() => {
    const resource = this.videosResource.value();
    return resource ? resource : [];
  });
  public isLoadingVideos = this.videosResource.isLoading;
}
