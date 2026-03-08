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
    return `${this.baseUrl}?search=${search}&page=${page}&limit=${limit}&type=${type}`;
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
}
