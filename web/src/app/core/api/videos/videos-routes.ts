import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VideoTrailer } from '../../models/videos/video-trailer';
import { GetTrailerDto, mapFromGetTrailerDtoToVideoTrailer } from './dtos/get-trailer-dto';
import { VideoType } from '../../models/videos/video';
import { mapFromPatchVideoReviewRequestDtoToVideoReview, PatchVideoReviewRequestDto, PatchVideoReviewResponseDto } from './dtos/patch-video-review-dto';
import { VideoReview } from '../../models/videos/video-review';

export class VideosRoutes {
  private readonly baseUrl = `${environment.apiUrl}videos`;

  constructor() {}

  private readonly httpClient = inject(HttpClient);

  public getAll(search: string, type: VideoType): string {
    return `${this.baseUrl}?search=${search}&type=${type}`;
  }

  public getCurrent(page: number, limit: number, type: VideoType): string {
    return `${this.baseUrl}/current?page=${page}&limit=${limit}&type=${type}`;
  }

  public getOne(id: string, type: VideoType) {
    return `${this.baseUrl}/${id}?type=${type}`;
  }

  public getCastings(id: string, type: VideoType) {
    return `${this.baseUrl}/${id}/castings?type=${type}`;
  }

  public getDirector(id: string, type: VideoType) {
    return `${this.baseUrl}/${id}/director?type=${type}`;
  }

  public getProviders(id: string, type: VideoType) {
    return `${this.baseUrl}/${id}/providers?type=${type}`;
  }

  public getTrailer(id: string, type: VideoType): Observable<VideoTrailer> {
    return this.httpClient
      .get<GetTrailerDto>(`${this.baseUrl}/${id}/trailer?type=${type}`)
      .pipe(map((dto) => mapFromGetTrailerDtoToVideoTrailer(dto)));
  }

  public getSeasons(id: string, type: VideoType): string {
    return `${this.baseUrl}/${id}/seasons?type=${type}`;
  }

  public patchReview(body: PatchVideoReviewRequestDto): Observable<VideoReview> {
    return this.httpClient.patch<PatchVideoReviewResponseDto>(`${this.baseUrl}/${body.id}/reviews`, body).pipe(
      map((response) => {
        return mapFromPatchVideoReviewRequestDtoToVideoReview(response);
      })
    )
  }

  public getReview(id: string, type: VideoType): string {
    return `${this.baseUrl}/${id}/reviews?type=${type}`;
  }

  public getWatched(page: number, limit: number, type: VideoType): string {
    return `${this.baseUrl}/watched?page=${page}&limit=${limit}&type=${type}`;
  }

  public getToWatch(page: number, limit: number, type: VideoType): string {
    return `${this.baseUrl}/to-watch?page=${page}&limit=${limit}&type=${type}`;
  }

  public getFavorite(page: number, limit: number, type: VideoType): string {
    return `${this.baseUrl}/favorite?page=${page}&limit=${limit}&type=${type}`;
  }

  public patchOneWatched(id: string, type: VideoType) {
    return this.httpClient.patch(`${this.baseUrl}/${id}/watched`, {
      type: type,
      id: id,
    })
  }

  public patchOneToWatch(id: string, type: VideoType) {
    return this.httpClient.patch(`${this.baseUrl}/${id}/to-watch`, {
      type: type,
      id: id,
    })
  }

  public patchOneFavorite(id: string, type: VideoType) {
    return this.httpClient.patch(`${this.baseUrl}/${id}/favorite`, {
      type: type,
      id: id,
    })
  }
}
