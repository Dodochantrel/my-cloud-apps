import { effect, inject, Injectable, signal } from '@angular/core';
import { EventsRoutes } from '../../../../core/api/events/events-routes';
import { NotificationService } from '../../../../core/notification/notification-service';
import { EventStore } from '../../stores/event-store';
import { CreateEventRequestDto } from '../../../../core/api/events/dtos/create-event-dto';
import { catchError, tap, throwError } from 'rxjs';
import { GroupStore } from '../../../groups/stores/group-store';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { mapFromGetAllGroupsDtosToGroupModels, GetAllGroupsResponseDto } from '../../../../core/api/groups/dtos/get-all-groups-dto';
import { GroupsRoutes } from '../../../../core/api/groups/groups-routes';
import { PaginatedResponseDto } from '../../../../core/api/paginated-reponse-dto';

@Injectable({
  providedIn: 'root',
})
export class CreateOrEditEventService {
  private eventsRoutes = new EventsRoutes();
  private readonly notificationService = inject(NotificationService);
  private readonly eventStore = inject(EventStore);
    protected readonly groupsRoutes = new GroupsRoutes();
    protected readonly groupStore = inject(GroupStore);

  public searchGroup = signal<string>('');

  constructor() {
    effect(() => {
      const error = this.groupsResource.error();
      if (error) {
        this.notificationService.error(
          'Erreur lors du chargement des groupes',
          (error as HttpErrorResponse).message || 'Erreur inconnue'
        );
      }
    });
    
    effect(() => {
      const resource = this.groupsResource.value();
      const groups = resource ? mapFromGetAllGroupsDtosToGroupModels(resource.data) : [];
      this.groupStore.setData(groups);
    });
  }

  private readonly groupsResource = httpResource<PaginatedResponseDto<GetAllGroupsResponseDto>>(
    () => this.groupsRoutes.getAll(
      this.searchGroup(),
      1,
      20,
    ),
  );
  public isLoadingGroups = this.groupsResource.isLoading;

  create(title: string, allDay: boolean, start: Date, end: Date, categoryId: string, groupsId: string[]) {
    const body: CreateEventRequestDto = {
      title,
      allDay,
      start: start.toISOString(),
      end: end.toISOString(),
      categoryId,
      groupsId,
    };
    return this.eventsRoutes.create(body).pipe(
      tap((response) => {
        this.eventStore.addOne(response);
        this.notificationService.success('Événement créé', 'L\'événement a été créé avec succès.');
      }),
      catchError((error) => {
        this.notificationService.error(
          'Erreur lors de la création de l\'événement',
          'Impossible de créer l\'événement. Veuillez réessayer.',
        );
        return throwError(() => error);
      }),
    );
  }

  edit(id: string, title: string, allDay: boolean, start: Date, end: Date, categoryId: string, groupsId: string[]) {
    const body: CreateEventRequestDto = {
      title,
      allDay,
      start: start.toISOString(),
      end: end.toISOString(),
      categoryId,
      groupsId: [],
    };
    return this.eventsRoutes.update(id, body).pipe(
      tap((response) => {
        this.eventStore.editOne(response.id, response);
        this.notificationService.success('Événement modifié', 'L\'événement a été modifié avec succès.');
      }),
      catchError((error) => {
        this.notificationService.error(
          'Erreur lors de la modification de l\'événement',
          'Impossible de modifier l\'événement. Veuillez réessayer.',
        );
        return throwError(() => error);
      }),
    );
  }
}
