import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VideoTrailer } from '../../models/videos/video-trailer';
import { GetTrailerDto, mapFromGetTrailerDtoToVideoTrailer } from './dtos/get-trailer-dto';
import { VideoType } from '../../models/videos/video';

export class VideosRoutes {
  private readonly baseUrl = `${environment.apiUrl}videos`;

  constructor() {}

  private readonly httpClient = inject(HttpClient);

  public getAll(search: string, page: number, limit: number, type: VideoType): string {
    return `${this.baseUrl}?page=${page}&limit=${limit}&type=${type}`;
  }

  public getCurrent(page: number, limit: number, type: VideoType): string {
    return `${this.baseUrl}/current?page=${page}&limit=${limit}&type=${type}`;
  }

  public getOne(externalId: string, type: VideoType) {
    return `${this.baseUrl}/${externalId}?type=${type}`;
  }

  public getCastings(externalId: string, type: VideoType) {
    return `${this.baseUrl}/${externalId}/castings?type=${type}`;
  }

  public getDirector(externalId: string, type: VideoType) {
    return `${this.baseUrl}/${externalId}/director?type=${type}`;
  }

  public getProviders(externalId: string, type: VideoType) {
    return `${this.baseUrl}/${externalId}/providers?type=${type}`;
  }

  public getTrailer(externalId: string, type: VideoType): Observable<VideoTrailer> {
    return this.httpClient
      .get<GetTrailerDto>(`${this.baseUrl}/${externalId}/trailer?type=${type}`)
      .pipe(map((dto) => mapFromGetTrailerDtoToVideoTrailer(dto)));
  }

  public getSeasons(externalId: string, type: VideoType): string {
    return `${this.baseUrl}/${externalId}/seasons?type=${type}`;
  }
}
