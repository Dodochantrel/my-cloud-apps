import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VideoTrailer } from '../../models/videos/video-trailer';
import { GetTrailerDto, mapFromGetTrailerDtoToVideoTrailer } from './dtos/get-trailer-dto';

export class VideosRoutes {
  private readonly baseUrl = `${environment.apiUrl}videos`;

  constructor() {}

  private readonly httpClient = inject(HttpClient);

  public getAll(search: string, page: number, limit: number, type: 'movie' | 'serie'): string {
    return `${this.baseUrl}?search=${search}&page=${page}&limit=${limit}&type=${type}`;
  }

  public getOne(externalId: string, type: 'movie' | 'serie') {
    return `${this.baseUrl}/${externalId}?type=${type}`;
  }

  public getCastings(externalId: string, type: 'movie' | 'serie') {
    return `${this.baseUrl}/${externalId}/castings?type=${type}`;
  }

  public getDirector(externalId: string, type: 'movie' | 'serie') {
    return `${this.baseUrl}/${externalId}/director?type=${type}`;
  }

  public getProviders(externalId: string, type: 'movie' | 'serie') {
    return `${this.baseUrl}/${externalId}/providers?type=${type}`;
  }

  public getTrailer(externalId: string, type: 'movie' | 'serie'): Observable<VideoTrailer> {
    return this.httpClient
      .get<GetTrailerDto>(`${this.baseUrl}/${externalId}/trailer?type=${type}`)
      .pipe(map((dto) => mapFromGetTrailerDtoToVideoTrailer(dto)));
  }

  public getSeasons(externalId: string, type: 'movie' | 'serie'): string {
    return `${this.baseUrl}/${externalId}/seasons?type=${type}`;
  }
}
