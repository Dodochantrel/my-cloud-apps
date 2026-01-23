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

  public getAll(search: string, page: number, limit: number): string {
    return `${this.baseUrl}?search=${search}&page=${page}&limit=${limit}&type=movie`;
  }

  public getOne(externalId: string) {
    return `${this.baseUrl}/${externalId}`;
  }

  public getCastings(externalId: string) {
    return `${this.baseUrl}/${externalId}/castings`;
  }

  public getDirector(externalId: string) {
    return `${this.baseUrl}/${externalId}/director`;
  }

  public getTrailer(externalId: string): Observable<VideoTrailer> {
    return this.httpClient
      .get<GetTrailerDto>(`${this.baseUrl}/${externalId}/trailer`)
      .pipe(map((dto) => mapFromGetTrailerDtoToVideoTrailer(dto)));
  }
}
