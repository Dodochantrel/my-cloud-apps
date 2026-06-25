import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { GalleryCategoryModel } from '../../../core/models/galleries/gallery-category-model';
import { GalleriesCategoriesRoutes } from '../../../core/api/galleries-categories/galleries-categories-routes';
import { NotificationService } from '../../../core/notification/notification-service';
import { GalleryStore } from '../stores/gallery-store';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { mapFromGetAllGalleriesCategoriesDtosToGalleriesCategories } from '../../../core/api/galleries-categories/dtos/get-all-galleries-categories-dto';
import { PaginatedResponseDto } from '../../../core/api/paginated-reponse-dto';

@Injectable({
  providedIn: 'root',
})
export class GalleryFileListService {
  private readonly galleriesCategoriesRoutes = new GalleriesCategoriesRoutes();
  protected readonly notificationService = inject(NotificationService);
  private readonly galleryStore = inject(GalleryStore);

  public selectedCategory: WritableSignal<GalleryCategoryModel | null> = signal(null);
  public search = signal<string>('');
  public page = signal<number>(1);
  public limit = signal<number>(20);

  constructor() {
    effect(() => {
      const error = this.galleriesCategoriesResource.error();
      if (error) {
        this.notificationService.error(
          'Erreur lors du chargement de la gallerie',
          (error as HttpErrorResponse).message || 'Erreur inconnue'
        );
      }
    });
    
    effect(() => {
      const resource = this.galleriesCategoriesResource.value();
      const categories = resource ? resource.data : [];
      this.galleryStore.setAll(categories);
    });
  }

  private readonly galleriesCategoriesResource = httpResource<PaginatedResponseDto<any>>(
    () => {
      const selectedCategory = this.selectedCategory();
      if (!selectedCategory) {
        return undefined;
      }

      return this.galleriesCategoriesRoutes.getGalleriesById(
        selectedCategory.id,
        this.search(),
        this.page(),
        this.limit(),
      );
    },
  );
  public isLoadingGroups = this.galleriesCategoriesResource.isLoading;
}
