import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { VideosRoutes } from '../../../core/api/videos/videos-routes';
import { httpResource } from '@angular/common/http';
import { GetOneVideoDto, mapFromGetOneVideoDtoToVideo } from '../../../core/api/videos/dtos/get-one-video-dto';
import { GetCastingDto, mapFromListGetCastingDtoToVideoCastingList } from '../../../core/api/videos/dtos/get-casting-dto';
import { GetDirectorDto, mapFromGetDirectorDtoToVideoDirector } from '../../../core/api/videos/dtos/get-director-dto';
import { NotificationService } from '../../../core/notification/notification-service';
import { mapFromGetProviderDtoArrayToVideoProviderArray } from '../../../core/api/videos/dtos/get-provider-dto';

@Injectable({
  providedIn: 'root',
})
export class MovieDetailsService {
  private readonly videosRoutes = new VideosRoutes();
  private readonly notificationService = inject(NotificationService);

  public id = signal<string | null>(null);

  private readonly videoResource = httpResource<GetOneVideoDto>(
    () =>
      this.id() ? this.videosRoutes.getOne(
        this.id()!,
        'movie'
      ) : ''
  );

  private readonly videoCastingResource = httpResource<GetCastingDto[]>(
    () =>
      this.id() ? this.videosRoutes.getCastings(
        this.id()!,
        'movie'
      ) : ''
  );

  private readonly videoDirectorResource = httpResource<GetDirectorDto>(
    () =>
      this.id() ? this.videosRoutes.getDirector(
        this.id()!,
        'movie'
      ) : ''
  );

  public readonly videoProvidersResource = httpResource<any>(
    () =>
      this.id() ? this.videosRoutes.getProviders(
        this.id()!,
        'movie'
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
      mappedVideo.providers = mapFromGetProviderDtoArrayToVideoProviderArray(providersData);
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
    return this.videosRoutes.getTrailer(this.id()!, 'movie').subscribe({
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

