import { inject, Injectable, signal } from '@angular/core';
import { EventsRoutes } from '../../../../core/api/events/events-routes';
import { NotificationService } from '../../../../core/notification/notification-service';
import { EventStore } from '../../stores/event-store';
import { CreateEventRequestDto } from '../../../../core/api/events/dtos/create-event-dto';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateOrEditEventService {
  private eventsRoutes = new EventsRoutes();
  private readonly notificationService = inject(NotificationService);
  private readonly eventStore = inject(EventStore);

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
      groupsId: groupsId,
    };
    return this.eventsRoutes.update(id, body).pipe(
      tap((response) => {
        this.eventStore.editOne(response);
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
