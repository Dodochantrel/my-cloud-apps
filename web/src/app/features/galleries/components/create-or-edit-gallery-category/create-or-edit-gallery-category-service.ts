import { GalleryCategoryModel } from './../../../../core/models/galleries/gallery-category-model';
import { NotificationService } from './../../../../core/notification/notification-service';
import { inject, Injectable } from '@angular/core';
import { GalleryCategoryStore } from '../../stores/gallery-category-store';
import { GalleriesCategoriesRoutes } from '../../../../core/api/galleries-categories/galleries-categories-routes';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateOrEditGalleryCategoryService {
  private readonly galleryCategoryStore = inject(GalleryCategoryStore);
  private readonly galleriesCategoriesRoutes = inject(GalleriesCategoriesRoutes);
  private readonly notificationService = inject(NotificationService);
  
  create(name: string, parentId: string | null) {
    this.galleriesCategoriesRoutes.create(name, parentId).pipe(
      tap((galleryCategory: GalleryCategoryModel) => {
        this.galleryCategoryStore.mapAndAddPaginatedData([galleryCategory], 10);
        this.notificationService.success('Catégorie créée avec succès', `La catégorie "${galleryCategory.name}" a été créée avec succès.`);
      }),
      catchError((error) => {
        this.notificationService.error('Erreur lors de la création de la catégorie', error.message || 'Une erreur est survenue lors de la création de la catégorie.');
        throw error;
      }),
    )
  }

  edit(id: string, name: string, parentId: string | null) {
    this.galleriesCategoriesRoutes.edit(id, name, parentId).pipe(
      tap((galleryCategory: GalleryCategoryModel) => {
        const updatedNode = this.galleryCategoryStore.mapFromEntityToTreeNode(galleryCategory);
        this.galleryCategoryStore.editOne(galleryCategory.id, updatedNode);
        this.notificationService.success('Catégorie modifiée avec succès', `La catégorie "${galleryCategory.name}" a été modifiée avec succès.`);
      }),
      catchError((error) => {
        this.notificationService.error('Erreur lors de la modification de la catégorie', error.message || 'Une erreur est survenue lors de la modification de la catégorie.');
        throw error;
      }),
    )
  }
}
