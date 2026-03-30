import { inject, Injectable } from '@angular/core';
import { NotificationService } from '../../../../core/notification/notification-service';
import { VideosRoutes } from '../../../../core/api/videos/videos-routes';
import { WatchedVideoStore } from '../../stores/watched-video-store';
import { ToWatchVideoStore } from '../../stores/to-watch-video-store';
import { Video } from '../../../../core/models/videos/video';
import { CurrentVideoStore } from '../../stores/current-video-store';

@Injectable({
  providedIn: 'root',
})
export class VideoCardService {
  private readonly videosRoutes = new VideosRoutes();
  private readonly notificationService = inject(NotificationService);
  public readonly watchedVideoStore = inject(WatchedVideoStore);
  public readonly toWatchVideoStore = inject(ToWatchVideoStore);
  public readonly currentVideoStore = inject(CurrentVideoStore);
  
  public isLoadingToWatch = false;
  public isLoadingFavorite = false;
  public isLoadingWatched = false;

  addOneToWatch(video: Video) {
    this.isLoadingToWatch = true;
    this.videosRoutes.patchOneToWatch(video.id, video.type).subscribe({
      next: () => {
        this.isLoadingToWatch = false;
        video.videoToWatch = !video.videoToWatch;
        this.updateOneInStores(video);
        this.notificationService.success('Succès', 'Vidéo ajoutée à la liste "À regarder"');
      },
      error: (error) => {
        this.isLoadingToWatch = false;
        this.notificationService.error('Erreur', `Impossible d'ajouter la vidéo à la liste "À regarder" : ${error.message || 'Erreur inconnue'}`);
      },
    });
  }

  addOneFavorite(video: Video) {
    this.isLoadingFavorite = true;
    this.videosRoutes.patchOneFavorite(video.id, video.type).subscribe({
      next: () => {
        this.isLoadingFavorite = false;
        video.videoFavorite = !video.videoFavorite;
        this.updateOneInStores(video);
        this.notificationService.success('Succès', 'Vidéo ajoutée aux favoris');
      },
      error: (error) => {
        this.isLoadingFavorite = false;
        this.notificationService.error('Erreur', `Impossible d'ajouter la vidéo aux favoris : ${error.message || 'Erreur inconnue'}`);
      },
    });
  }

  addOneWatched(video: Video) {
    this.isLoadingWatched = true;
    this.videosRoutes.patchOneWatched(video.id, video.type).subscribe({
      next: () => {
        this.isLoadingWatched = false;
        video.videoWatched = !video.videoWatched;
        this.updateOneInStores(video);
        this.notificationService.success('Succès', 'Vidéo ajoutée aux vidéos vues');
      },
      error: (error) => {
        this.isLoadingWatched = false;
        this.notificationService.error('Erreur', `Impossible d'ajouter la vidéo aux vidéos vues : ${error.message || 'Erreur inconnue'}`);
      },
    });
  }

  updateOneInStores(video: Video) {
    this.currentVideoStore.editOne(video);

    if (video.videoWatched) {
      this.watchedVideoStore.createOrEdit(video);
    } else {
      this.watchedVideoStore.deleteOne(video.id);
    }

    if (video.videoToWatch) {
      this.toWatchVideoStore.createOrEdit(video);
    } else {
      this.toWatchVideoStore.deleteOne(video.id);
    }
  }
}
