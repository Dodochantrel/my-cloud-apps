import { inject, Injectable, linkedSignal, signal, effect } from '@angular/core';
import { VideosRoutes } from '../../../core/api/videos/videos-routes';
import { NotificationService } from '../../../core/notification/notification-service';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { GetOneVideoDto, mapFromGetOneVideoDtoToVideo } from '../../../core/api/videos/dtos/get-one-video-dto';
import { GetCastingDto, mapFromListGetCastingDtoToVideoCastingList } from '../../../core/api/videos/dtos/get-casting-dto';
import { GetDirectorDto, mapFromGetDirectorDtoToVideoDirector } from '../../../core/api/videos/dtos/get-director-dto';
import { GetProviderDto, mapFromGetProviderDtoArrayToVideoProviderArray } from '../../../core/api/videos/dtos/get-provider-dto';
import { GetSeasonDto, mapFromGetSeasonDtosToVideoSeasons } from '../../../core/api/videos/dtos/get-season-dto';
import { GetVideoReviewResponseDto, mapFromGetVideoReviewResponseDtoToVideoReview } from '../../../core/api/videos/dtos/get-video-review-dto';
import { VideoType } from '../../../core/models/videos/video';

@Injectable({
  providedIn: 'root',
})
export class VideoDetailsService {
  private readonly videosRoutes = new VideosRoutes();
  private readonly notificationService = inject(NotificationService);

  constructor() {
  }

  public id = signal<string | null>(null);
  public type = signal<VideoType>('movie');

  private readonly videoResource = httpResource<GetOneVideoDto>(
    () =>
      this.id()
        ? this.videosRoutes.getOne(this.id()!, this.type())
        : ''
  );

  private readonly videoCastingResource = httpResource<GetCastingDto[]>(
    () =>
      this.id()
        ? this.videosRoutes.getCastings(this.id()!, this.type())
        : ''
  );

  private readonly videoDirectorResource = httpResource<GetDirectorDto>(
    () =>
      this.id()
        ? this.videosRoutes.getDirector(this.id()!, this.type())
        : ''
  );

  public readonly videoProvidersResource = httpResource<GetProviderDto[]>(
    () =>
      this.id()
        ? this.videosRoutes.getProviders(this.id()!, this.type())
        : ''
  );

  private readonly videoSeasonsResource = httpResource<GetSeasonDto[]>(
    () =>
      this.id() && this.type() === 'serie'
        ? this.videosRoutes.getSeasons(this.id()!, this.type())
        : ''
  );
  
  private readonly videoReviewResource = httpResource<GetVideoReviewResponseDto>(
    () =>
      this.id()
        ? this.videosRoutes.getReview(this.id()!, this.type())
        : ''
  );

  video = linkedSignal(() => {
    const videoData = this.videoResource.error() ? null : this.videoResource.value();
    if (!videoData) return null;

    const mappedVideo = mapFromGetOneVideoDtoToVideo(videoData);
    const castingData = this.videoCastingResource.error() ? null : this.videoCastingResource.value();
    if (castingData) {
      mappedVideo.castings = mapFromListGetCastingDtoToVideoCastingList(castingData);
    }
    const directorData = this.videoDirectorResource.error() ? null : this.videoDirectorResource.value();
    if (directorData) {
      mappedVideo.director = mapFromGetDirectorDtoToVideoDirector(directorData);
    }
    const providersData = this.videoProvidersResource.error() ? null : this.videoProvidersResource.value();
    if (providersData) {
      mappedVideo.providers = mapFromGetProviderDtoArrayToVideoProviderArray(providersData);
    }
    if (this.type() === 'serie') {
      const seasonsData = this.videoSeasonsResource.error() ? null : this.videoSeasonsResource.value();
      if (seasonsData) {
        mappedVideo.seasons = mapFromGetSeasonDtosToVideoSeasons(seasonsData);
      }
    }

    const reviewData = this.videoReviewResource.error() ? null : this.videoReviewResource.value(); 
    if (reviewData) {
      mappedVideo.review = mapFromGetVideoReviewResponseDtoToVideoReview(reviewData);
    }
    return mappedVideo;
  });

  public isLoadingVideo = this.videoResource.isLoading;
  public isLoadingCasting = this.videoCastingResource.isLoading;
  public isLoadingDirector = this.videoDirectorResource.isLoading;
  public isLoadingProviders = this.videoProvidersResource.isLoading;
  public isLoadingSeasons = this.videoSeasonsResource.isLoading;
  public isLoadingReview = this.videoReviewResource.isLoading;

  public isVisibleTrailerDialog = signal<boolean>(false);
  public isLoadingTrailer = signal<boolean>(false);

  getVideoTrailer() {
    if (this.video()?.trailer) {
      return;
    }
    this.isLoadingTrailer.set(true);
    return this.videosRoutes.getTrailer(this.id()!, this.type()).subscribe({
      next: (trailer) => {
        this.isLoadingTrailer.set(false);
        const currentVideo = this.video();
        if (!currentVideo) return;

        currentVideo.trailer = trailer;
        this.video.set(currentVideo);
        this.isVisibleTrailerDialog.set(true);
      },
      error: (err) => {
        this.isLoadingTrailer.set(false);
        this.notificationService.error('Impossible de charger la bande-annonce', err);
      },
    });
  }

  public isOpenReview = signal<boolean>(false);

  patchVideoReview() {}
}
