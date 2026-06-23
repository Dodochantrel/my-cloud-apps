import { GalleryCategoryModel } from './../../models/galleries/gallery-category-model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { inject } from '@angular/core/primitives/di';
import { mapFromPostGalleryCategoryResponseDtoToGalleryCategory, PostGalleryCategoryRequestDto, PostGalleryCategoryResponseDto } from './dtos/post-gallery-category-dto';
import { PatchGalleryCategoryRequestDto, PatchGalleryCategoryResponseDto, mapFromPatchGalleryCategoryResponseDtoToGalleryCategory } from './dtos/patch-gallery-category-dto';

export class GalleriesCategoriesRoutes {
  private readonly baseUrl = `${environment.apiUrl}galleries-categories`;
  private readonly httpClient = inject(HttpClient);

  public getAll(search: string, page: number, limit: number): string {
    return (
      this.baseUrl + `?search=${encodeURIComponent(search)}` + `&page=${page}` + `&limit=${limit}`
    );
  }

  create(name: string, parentId: string | null, groupsId: string[]): Observable<GalleryCategoryModel> {
    const dto: PostGalleryCategoryRequestDto = { name, parentId, groupsId };
    return this.httpClient
      .post<PostGalleryCategoryResponseDto>(this.baseUrl, dto)
      .pipe(map(mapFromPostGalleryCategoryResponseDtoToGalleryCategory));
  }

  edit(id: string, name: string, parentId: string | null, groupsId: string[]): Observable<GalleryCategoryModel> {
    const dto: PatchGalleryCategoryRequestDto = { name, parentId, groupsId };
    return this.httpClient
      .patch<PatchGalleryCategoryResponseDto>(`${this.baseUrl}/${id}`, dto)
      .pipe(map(mapFromPatchGalleryCategoryResponseDtoToGalleryCategory));
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
