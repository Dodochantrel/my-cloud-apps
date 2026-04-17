import { effect, inject, Injectable, signal } from '@angular/core';
import { EventsRoutes } from '../../../core/api/events/events-routes';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { PaginatedResponseDto } from '../../../core/api/paginated-reponse-dto';
import { NotificationService } from '../../../core/notification/notification-service';
import {
  GetAllEventsResponseDto,
  mapFromGetAllEventsDtosToModels,
} from '../../../core/api/events/dtos/get-all-events-dto';
import { EventStore } from '../stores/event-store';

@Injectable({
  providedIn: 'root',
})
export class EventListService {
  private eventsRoutes = new EventsRoutes();
  private readonly notificationService = inject(NotificationService);
  private readonly eventStore = inject(EventStore);

  public startDate = signal<Date>(this.defaultStartDate);
  public endDate = signal<Date>(this.defaultEndDate);
  public search = signal<string>('');
  public page = signal<number>(1);
  public limit = signal<number>(10);

  get defaultStartDate(): Date {
    // Mtn moins 1 ans
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date;
  }

  get defaultEndDate(): Date {
    // MTn plus 1 ans
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    return date;
  }

  constructor() {
    effect(() => {
      const error = this.groupsResource.error();
      if (error) {
        this.notificationService.error(
          'Erreur lors du chargement des groupes',
          (error as HttpErrorResponse).message || 'Erreur inconnue',
        );
      }
    });

    effect(() => {
      const resource = this.groupsResource.value();
      const events = resource ? mapFromGetAllEventsDtosToModels(resource.data) : [];
      this.eventStore.setData(events);
    });
  }

  private readonly groupsResource = httpResource<PaginatedResponseDto<GetAllEventsResponseDto>>(
    () =>
      this.eventsRoutes.getAll(
        this.search(),
        this.page(),
        this.limit(),
        this.startDate(),
        this.endDate(),
      ),
  );
  public isLoadingGroups = this.groupsResource.isLoading;
}
