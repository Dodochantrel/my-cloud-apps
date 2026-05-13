import { effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { NotificationService } from '../../../core/notification/notification-service';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { PaginatedResponseDto } from '../../../core/api/paginated-reponse-dto';
import { GalleriesCategoriesRoutes } from '../../../core/api/galleries-categories/galleries-categories-routes';
import { GetAllGalleriesCategoriesDto, mapFromGetAllGalleriesCategoriesDtosToGalleriesCategories } from '../../../core/api/galleries-categories/dtos/get-all-galleries-categories-dto';

@Injectable({
  providedIn: 'root',
})
export class GalleryCategoryService {
  private galleryCategoriesRoutes = new GalleriesCategoriesRoutes();
  private readonly notificationService = inject(NotificationService);

  public search = signal<string>('');

  constructor() {
    effect(() => {
      const error = this.galleryCategoriesResource.error();
      if (error) {
        this.notificationService.error(
          'Erreur lors du chargement des catégories de galeries',
          (error as HttpErrorResponse).message || 'Erreur inconnue',
        );
      }
    });
  }

  private readonly galleryCategoriesResource = httpResource<PaginatedResponseDto<GetAllGalleriesCategoriesDto>>(
    () =>
      this.galleryCategoriesRoutes.getAll(
        this.search(),
        1,
        20,
      ),
  );

  public galleryCategories = linkedSignal(() => {
    const resource = this.galleryCategoriesResource.value();
    return resource ? mapFromGetAllGalleriesCategoriesDtosToGalleriesCategories(resource.data) : [];
  });
  public isLoadingGalleryCategories = this.galleryCategoriesResource.isLoading;
}
