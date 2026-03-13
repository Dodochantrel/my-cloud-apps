import { inject, Injectable } from '@angular/core';
import { NotificationService } from '../../../../core/notification/notification-service';
import { VideosRoutes } from '../../../../core/api/videos/videos-routes';
import { FormGroup } from '@angular/forms';
import { ReviewVideoFormModel } from '../../forms/review-video-form';
import { CurrentVideoStore } from '../../stores/current-video-store';
import { mapFromFormToPatchVideoReviewRequestDto } from '../../../../core/api/videos/dtos/patch-video-review-dto';
import { VideoReview } from '../../../../core/models/videos/video-review';

@Injectable({
  providedIn: 'root',
})
export class ReviewVideoService {
  private readonly videosRoutes = new VideosRoutes();
  private readonly notificationService = inject(NotificationService);

  // Stores
  private readonly currentVideoStore = inject(CurrentVideoStore);

  public isLoadingSave: boolean = false;
  save(form: FormGroup<ReviewVideoFormModel>, onSuccess?: () => void) {
    this.isLoadingSave = true;
    this.videosRoutes
      .patchReview(mapFromFormToPatchVideoReviewRequestDto(form))
      .subscribe({
        next: (videoReview: VideoReview) => {
          this.notificationService.success('Critique enregistrée', 'Votre critique a été enregistrée avec succès');
          const video = this.currentVideoStore.getOne(form.get('id')?.value!);
          if (video) {
            video.review = videoReview;
            this.currentVideoStore.editOne(video.id, video);
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
}
