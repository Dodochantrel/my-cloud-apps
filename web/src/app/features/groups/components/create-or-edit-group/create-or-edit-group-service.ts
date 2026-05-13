import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { UsersRoutes } from '../../../../core/api/users/users-routes';
import { httpResource } from '@angular/common/http';
import {
  GetAllUsersResponseDto,
  mapFromGetAllUsersDtosToUserModels,
} from '../../../../core/api/users/dtos/get-all-users-dto';
import { PaginatedResponseDto } from '../../../../core/api/paginated-reponse-dto';
import { GroupsRoutes } from '../../../../core/api/groups/groups-routes';
import { CreateGroupRequestDto } from '../../../../core/api/groups/dtos/create-group-dto';
import { GroupRole } from '../../../../core/models/groups/group-model';
import { catchError, tap, throwError } from 'rxjs';
import { GroupStore } from '../../stores/group-store';
import { NotificationService } from '../../../../core/notification/notification-service';

@Injectable({
  providedIn: 'root',
})
export class CreateOrEditGroupService {
  private usersRoutes = new UsersRoutes();
  private groupsRoutes = new GroupsRoutes();
  private groupStore = inject(GroupStore);
  private notificationService = inject(NotificationService);

  public search = signal<string>('');

  constructor() {}

  private readonly usersResource = httpResource<PaginatedResponseDto<GetAllUsersResponseDto>>(() =>
    this.usersRoutes.getAll(this.search(), 1, 20),
  );
  public users = linkedSignal(() => {
    const resource = this.usersResource.value();
    return resource ? mapFromGetAllUsersDtosToUserModels(resource.data) : [];
  });

  public isLoadingUsers = this.usersResource.isLoading;

  public createGroup(name: string, members: { userId: string; role: GroupRole }[]) {
    const body: CreateGroupRequestDto = {
      name,
      users: members.map((m) => ({ userId: m.userId, role: m.role })),
    };
    return this.groupsRoutes.create(body).pipe(
      tap((response) => {
        this.groupStore.addOne(response);
        this.notificationService.success('Groupe créé', 'Le groupe a été créé avec succès.');
      }),
      catchError((error) => {
        this.notificationService.error('Erreur lors de la création du groupe', 'Impossible de créer le groupe. Veuillez réessayer.');
        return throwError(() => error);
      }),
    );
  }

  public editGroup(groupId: string, name: string, members: { userId: string; role: GroupRole }[]) {
    const body: CreateGroupRequestDto = {
      name,
      users: members.map((m) => ({ userId: m.userId, role: m.role })),
    };

    return this.groupsRoutes.update(groupId, body).pipe(
      tap((response) => {
        this.groupStore.editOne(response);
        this.notificationService.success('Groupe modifié', 'Le groupe a été modifié avec succès.');
      }),
      catchError((error) => {
        this.notificationService.error('Erreur lors de la modification du groupe', 'Impossible de modifier le groupe. Veuillez réessayer.');
        return throwError(() => error);
      }),
    );
  }
}
