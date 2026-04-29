import { inject, Injectable } from '@angular/core';
import { NotificationService } from '../../../../core/notification/notification-service';
import { VideosRoutes } from '../../../../core/api/videos/videos-routes';
import { FormGroup } from '@angular/forms';
import { ReviewVideoFormModel } from '../../forms/review-video-form';
import { mapFromFormToPatchVideoReviewRequestDto } from '../../../../core/api/videos/dtos/patch-video-review-dto';
import { VideoReview } from '../../../../core/models/videos/video-review';
import { Video } from '../../../../core/models/videos/video';
import { StoreUtils } from '../../../../shared/utils/store-utils';
import { CurrentVideoStore } from '../../stores/current-video-store';
import { ToWatchVideoStore } from '../../stores/to-watch-video-store';
import { WatchedVideoStore } from '../../stores/watched-video-store';

@Injectable({
  providedIn: 'root',
})
export class ReviewVideoService {
  private readonly videosRoutes = new VideosRoutes();
  private readonly notificationService = inject(NotificationService);

  // Stores
  private readonly currentVideoStore = inject(CurrentVideoStore);
  private readonly toWatchVideoStore = inject(ToWatchVideoStore);
  private readonly watchedVideoStore = inject(WatchedVideoStore);

  public isLoadingSave: boolean = false;

  save(form: FormGroup<ReviewVideoFormModel>, onSuccess?: () => void) {
    this.isLoadingSave = true;
    this.videosRoutes
      .patchReview(mapFromFormToPatchVideoReviewRequestDto(form))
      .subscribe({
        next: (videoReview: VideoReview) => {
          this.notificationService.success('Critique enregistrée', 'Votre critique a été enregistrée avec succès');
          const video = this.currentVideoStore.findOne(form.get('id')?.value!);
          if (video) {
            video.review = videoReview;
            this.updateOneInStores(video);
          }
          onSuccess?.();
        },
        error: () => {
          this.notificationService.error('Critique non enregistrée', 'Une erreur est survenue lors de l\'enregistrement de votre critique');
        },
      })
      .add(() => {
        this.isLoadingSave = false;
      });
  }

  private updateOneInStores(video: Video) {
    this.currentVideoStore.editOne(video.id, video);

    if (video.videoWatched) {
      this.watchedVideoStore.addOrEditOne(video.id, video);
    } else {
      this.watchedVideoStore.deleteOne(video.id);
    }

    if (video.videoToWatch) {
      this.toWatchVideoStore.addOrEditOne(video.id, video);
    } else {
      this.toWatchVideoStore.deleteOne(video.id);
    }
  }
}
