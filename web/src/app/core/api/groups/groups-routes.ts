import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { GroupModel } from '../../models/groups/group-model';
import {
  CreateGroupRequestDto,
  CreateGroupResponseDto,
  mapFromCreateGroupDtoToGroupModel,
} from './dtos/create-group-dto';
import {
  AddUsersToGroupRequestDto,
  AddUsersToGroupResponseDto,
} from './dtos/add-users-to-group-dto';
import {
  UpdateGroupRequestDto,
  UpdateGroupResponseDto,
  mapFromUpdateGroupDtoToGroupModel,
} from './dtos/update-group-dto';
import { DeleteGroupResponseDto } from './dtos/delete-group-dto';

export class GroupsRoutes {
  private readonly baseUrl = `${environment.apiUrl}groups`;
  private readonly httpClient = inject(HttpClient);

  public getAll(search: string, page: number, limit: number): string {
    return (
      this.baseUrl + `?search=${encodeURIComponent(search)}` + `&page=${page}` + `&limit=${limit}`
    );
  }

  public create(body: CreateGroupRequestDto): Observable<GroupModel> {
    return this.httpClient
      .post<CreateGroupResponseDto>(this.baseUrl, body)
      .pipe(map((dto) => mapFromCreateGroupDtoToGroupModel(dto)));
  }

  public addUsers(
    groupId: string,
    body: AddUsersToGroupRequestDto,
  ): Observable<AddUsersToGroupResponseDto> {
    return this.httpClient.post<AddUsersToGroupResponseDto>(
      `${this.baseUrl}/${groupId}/users`,
      body,
    );
  }

  public update(groupId: string, body: UpdateGroupRequestDto): Observable<GroupModel> {
    return this.httpClient
      .patch<UpdateGroupResponseDto>(`${this.baseUrl}/${groupId}`, body)
      .pipe(map((dto) => mapFromUpdateGroupDtoToGroupModel(dto)));
  }

  public delete(groupId: string): Observable<DeleteGroupResponseDto> {
    return this.httpClient.delete<DeleteGroupResponseDto>(`${this.baseUrl}/${groupId}`);
  }
}
