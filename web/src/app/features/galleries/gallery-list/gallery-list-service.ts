import { effect, inject, Injectable, signal } from '@angular/core';
import { GalleriesCategoriesRoutes } from '../../../core/api/galleries-categories/galleries-categories-routes';
import { GalleryCategoryStore } from '../stores/gallery-category-store';
import { NotificationService } from '../../../core/notification/notification-service';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { PaginatedResponseDto } from '../../../core/api/paginated-reponse-dto';
import { GetAllGalleriesCategoriesDto, mapFromGetAllGalleriesCategoriesDtosToGalleriesCategories } from '../../../core/api/galleries-categories/dtos/get-all-galleries-categories-dto';

@Injectable({
  providedIn: 'root',
})
export class GalleryListService {
  private readonly galleriesCategoriesRoutes = new GalleriesCategoriesRoutes();
  private readonly galleryCategoryStore = inject(GalleryCategoryStore);
  protected readonly notificationService = inject(NotificationService);

  public search = signal<string>('');
  public page = signal<number>(1);
  public limit = signal<number>(20);

  constructor() {
    effect(() => {
      const error = this.galleriesCategoriesResource.error();
      if (error) {
        this.notificationService.error(
          'Erreur lors du chargement des des catégories de gallerie',
          (error as HttpErrorResponse).message || 'Erreur inconnue'
        );
      }
    });
    
    effect(() => {
      const resource = this.galleriesCategoriesResource.value();
      const categories = resource ? mapFromGetAllGalleriesCategoriesDtosToGalleriesCategories(resource.data) : [];
      this.galleryCategoryStore.mapAndSetData(categories);
    });
  }

  private readonly galleriesCategoriesResource = httpResource<PaginatedResponseDto<GetAllGalleriesCategoriesDto>>(
    () => this.galleriesCategoriesRoutes.getAll(
      this.search(),
      this.page(),
      this.limit(),
    ),
  );
  public isLoadingGroups = this.galleriesCategoriesResource.isLoading;
}
