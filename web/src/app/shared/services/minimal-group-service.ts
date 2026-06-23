import { effect, inject, Injectable, signal } from '@angular/core';
import { GroupsRoutes } from '../../core/api/groups/groups-routes';
import { GroupStore } from '../../features/groups/stores/group-store';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { mapFromGetAllGroupsDtosToGroupModels, GetAllGroupsResponseDto } from '../../core/api/groups/dtos/get-all-groups-dto';
import { PaginatedResponseDto } from '../../core/api/paginated-reponse-dto';
import { NotificationService } from '../../core/notification/notification-service';

@Injectable({
  providedIn: 'root',
})
export class MinimalGroupService {
  private readonly notificationService = inject(NotificationService);
  protected readonly groupsRoutes = new GroupsRoutes();
  protected readonly groupStore = inject(GroupStore);
  
  public search = signal<string>('');

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
      1,
      20,
    ),
  );
  public isLoadingGroups = this.groupsResource.isLoading;
}
