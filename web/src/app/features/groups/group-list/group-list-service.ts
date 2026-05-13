import { effect, inject, Injectable, signal } from '@angular/core';
import { GroupsRoutes } from '../../../core/api/groups/groups-routes';
import { GroupStore } from '../stores/group-store';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { NotificationService } from '../../../core/notification/notification-service';
import { GetAllGroupsResponseDto, mapFromGetAllGroupsDtosToGroupModels } from '../../../core/api/groups/dtos/get-all-groups-dto';
import { PaginatedResponseDto } from '../../../core/api/paginated-reponse-dto';

@Injectable({
  providedIn: 'root',
})
export class GroupListService {
  protected readonly groupsRoutes = new GroupsRoutes();
  protected readonly groupStore = inject(GroupStore);
  protected readonly notificationService = inject(NotificationService);

  public search = signal<string>('');
  public page = signal<number>(1);
  public limit = signal<number>(20);

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
      this.groupStore.setAll(groups);
    });
  }

  private readonly groupsResource = httpResource<PaginatedResponseDto<GetAllGroupsResponseDto>>(
    () => this.groupsRoutes.getAll(
      this.search(),
      this.page(),
      this.limit(),
    ),
  );
  public isLoadingGroups = this.groupsResource.isLoading;

  public deleteGroup(groupId: string) {
    this.groupsRoutes.delete(groupId).subscribe({
      next: () => {
        this.groupStore.deleteOne(groupId);
        this.notificationService.success('Groupe supprimé', 'Le groupe a été supprimé avec succès.');
      },
      error: (error) => {
        this.notificationService.error('Erreur lors de la suppression du groupe', error.message || 'Erreur inconnue');
      },
    });
  }
}
