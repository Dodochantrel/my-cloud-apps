import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { inject } from '@angular/core';

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
}
