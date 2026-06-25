import { inject, Injectable } from '@angular/core';
import { GalleryStore } from '../../stores/gallery-store';
import { GalleriesRoutes, GalleryResponseDto } from '../../../../core/api/galleries/galleries-routes';
import { NotificationService } from '../../../../core/notification/notification-service';
import { catchError, forkJoin, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddGalleryService {
  private readonly galleryStore = inject(GalleryStore);
  private readonly galleriesRoutes = new GalleriesRoutes();
  readonly notificationService = inject(NotificationService);

  create(files: File[], categoryId: string) {
    if (!files.length) {
      return of([] as GalleryResponseDto[]);
    }

    return forkJoin(files.map((file) => this.galleriesRoutes.create(file, categoryId))).pipe(
      tap((galleries: GalleryResponseDto[]) => {
        galleries.forEach((gallery) => this.galleryStore.addOne(gallery, 20));
        this.notificationService.success(
          'Fichiers ajoutés avec succès',
          `${galleries.length} fichier(s) ajouté(s) à la galerie.`,
        );
      }),
      catchError((error) => {
        this.notificationService.error(
          'Erreur lors de la création de la galerie',
          error.message || 'Une erreur est survenue lors de l\'ajout de la photo.',
        );
        return throwError(() => error);
      }),
    );
  }
}
