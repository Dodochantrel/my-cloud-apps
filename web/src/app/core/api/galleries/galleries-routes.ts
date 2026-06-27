import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export type GalleryResponseDto = {
  id: string;
  name: string;
  mimetype: string;
  size: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  urls: {
    small: string;
    medium: string;
    big: string;
  };
};

export class GalleriesRoutes {
  private readonly baseUrl = `${environment.apiUrl}galleries`;
  private readonly httpClient = inject(HttpClient);

  create(file: File, isPrivate: boolean, categoryId: string): Observable<GalleryResponseDto> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('isPrivate', JSON.stringify(isPrivate));
    formData.append('categoryId', categoryId);
    return this.httpClient.post<GalleryResponseDto>(this.baseUrl, formData);
  }
}