import { effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { EventsCategoriesRoutes } from '../../../core/api/events-categories/events-categories-routes';
import { NotificationService } from '../../../core/notification/notification-service';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { PaginatedResponseDto } from '../../../core/api/paginated-reponse-dto';
import { GetAllEventsCategoriesResponseDto, mapFromGetAllEventsCategoriesDtosToModels } from '../../../core/api/events-categories/dtos/get-all-events-categories-dto';

@Injectable({
  providedIn: 'root',
})
export class EventCategoryService {
  private eventsCategoriesRoutes = new EventsCategoriesRoutes();
  private readonly notificationService = inject(NotificationService);

  public search = signal<string>('');

  constructor() {
    effect(() => {
      const error = this.eventsResource.error();
      if (error) {
        this.notificationService.error(
          'Erreur lors du chargement des catégories d\'événements',
          (error as HttpErrorResponse).message || 'Erreur inconnue',
        );
      }
    });
  }

  private readonly eventsResource = httpResource<PaginatedResponseDto<GetAllEventsCategoriesResponseDto>>(
    () =>
      this.eventsCategoriesRoutes.getAll(
        this.search(),
        1,
        20,
      ),
  );

  public events = linkedSignal(() => {
    const resource = this.eventsResource.value();
    return resource ? mapFromGetAllEventsCategoriesDtosToModels(resource.data) : [];
  });
  public isLoadingEvents = this.eventsResource.isLoading;
}
