import { effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { EventsRoutes } from '../../../../core/api/events/events-routes';
import { NotificationService } from '../../../../core/notification/notification-service';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { GetAllEventsResponseDto, mapFromGetAllEventsDtosToModels } from '../../../../core/api/events/dtos/get-all-events-dto';
import { PaginatedResponseDto } from '../../../../core/api/paginated-reponse-dto';

@Injectable({
  providedIn: 'root',
})
export class EventListFiltersService {
  private eventsRoutes = new EventsRoutes();
  private readonly notificationService = inject(NotificationService);

  public search = signal<string>('');

  constructor() {
    effect(() => {
      const error = this.eventsResource.error();
      if (error) {
        this.notificationService.error(
          'Erreur lors du chargement des événements',
          (error as HttpErrorResponse).message || 'Erreur inconnue',
        );
      }
    });
  }

  private readonly eventsResource = httpResource<PaginatedResponseDto<GetAllEventsResponseDto>>(
    () =>
      this.eventsRoutes.getAll(
        this.search(),
        1,
        20,
      ),
  );

  public events = linkedSignal(() => {
    const resource = this.eventsResource.value();
    return resource ? mapFromGetAllEventsDtosToModels(resource.data) : [];
  });
  public isLoadingEvents = this.eventsResource.isLoading;
}
