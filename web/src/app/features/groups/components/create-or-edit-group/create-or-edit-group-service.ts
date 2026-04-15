import { effect, Injectable, linkedSignal, signal } from '@angular/core';
import { UsersRoutes } from '../../../../core/api/users/users-routes';
import { httpResource } from '@angular/common/http';
import {
  GetAllUsersResponseDto,
  mapFromGetAllUsersDtosToUserModels,
} from '../../../../core/api/users/dtos/get-all-users-dto';
import { PaginatedResponseDto } from '../../../../core/api/paginated-reponse-dto';

@Injectable({
  providedIn: 'root',
})
export class CreateOrEditGroupService {
  private usersRoutes = new UsersRoutes();

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
}
