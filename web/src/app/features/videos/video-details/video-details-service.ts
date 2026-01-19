import { computed, Injectable, linkedSignal, signal } from '@angular/core';
import { VideosRoutes } from '../../../core/api/videos/videos-routes';
import { httpResource } from '@angular/common/http';
import { GetOneVideoDto, mapFromGetOneVideoDtoToVideo } from '../../../core/api/videos/dtos/get-one-video-dto';
import { GetCastingDto, mapFromListGetCastingDtoToVideoCastingList } from '../../../core/api/videos/dtos/get-casting-dto';
import { GetDirectorDto, mapFromGetDirectorDtoToVideoDirector } from '../../../core/api/videos/dtos/get-director-dto';

@Injectable({
  providedIn: 'root',
})
export class VideoDetailsService {
  private readonly videosRoutes = new VideosRoutes();

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
    return mappedVideo;
  });

  public isLoadingVideo = this.videoResource.isLoading;
  //public isLoadingVideo = signal<boolean>(true);
  public isLoadingCasting = this.videoCastingResource.isLoading;
  public isLoadingDirector = this.videoDirectorResource.isLoading;
}

