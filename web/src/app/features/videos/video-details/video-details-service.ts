import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { VideosRoutes } from '../../../core/api/videos/videos-routes';
import { httpResource } from '@angular/common/http';
import { GetOneVideoDto, mapFromGetOneVideoDtoToVideo } from '../../../core/api/videos/dtos/get-one-video-dto';
import { GetCastingDto, mapFromListGetCastingDtoToVideoCastingList } from '../../../core/api/videos/dtos/get-casting-dto';
import { GetDirectorDto, mapFromGetDirectorDtoToVideoDirector } from '../../../core/api/videos/dtos/get-director-dto';
import { NotificationService } from '../../../core/notification/notification-service';

@Injectable({
  providedIn: 'root',
})
export class VideoDetailsService {
  private readonly videosRoutes = new VideosRoutes();
  private readonly notificationService = inject(NotificationService);

  public id = signal<string | null>(null);

  private readonly videoResource = httpResource<GetOneVideoDto>(
    () =>
      this.id() ? this.videosRoutes.getOne(
        this.id()!
      ) : ''
  );

  private externalId = computed(() => {
    const videoData = this.videoResource.value();
    return videoData ? videoData.externalId : '';
  });

  private readonly videoCastingResource = httpResource<GetCastingDto[]>(
    () =>
      this.externalId() ? this.videosRoutes.getCastings(
        this.externalId()
      ) : ''
  );

  private readonly videoDirectorResource = httpResource<GetDirectorDto>(
    () =>
      this.externalId() ? this.videosRoutes.getDirector(
        this.externalId()
      ) : ''
  );

  public readonly videoProvidersResource = httpResource<any>(
    () =>
      this.externalId() ? this.videosRoutes.getProviders(
        this.externalId()
      ) : ''
  );

  video = linkedSignal(() => {
    const videoData = this.videoResource.value();
    if (!videoData) return null;

    const mappedVideo = mapFromGetOneVideoDtoToVideo(videoData);
    const castingData = this.videoCastingResource.value();
    if (castingData) {
      mappedVideo.castings = mapFromListGetCastingDtoToVideoCastingList(castingData);
    }
    const directorData = this.videoDirectorResource.value();
    if (directorData) {
      mappedVideo.director = mapFromGetDirectorDtoToVideoDirector(directorData);
    }
    const providersData = this.videoProvidersResource.value();
    if (providersData) {
      mappedVideo.providers = providersData;
    }
    return mappedVideo;
  });

  public isLoadingVideo = this.videoResource.isLoading;
  public isLoadingCasting = this.videoCastingResource.isLoading;
  public isLoadingDirector = this.videoDirectorResource.isLoading;
  public isLoadingProviders = this.videoProvidersResource.isLoading;

  public isVisibleTrailerDialog = signal<boolean>(false);
  public isLoadingTrailer = signal<boolean>(false);

  getVideoTrailer() {
    if (this.video()?.trailer) {
      return;
    }
    this.isLoadingTrailer.set(true);
    return this.videosRoutes.getTrailer(this.externalId()).subscribe({
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
}

