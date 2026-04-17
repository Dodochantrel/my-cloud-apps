import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EventCategoryModel } from '../../models/events/event-category-model';
import {
  CreateEventCategoryRequestDto,
  CreateEventCategoryResponseDto,
  mapFromCreateEventCategoryDtoToModel,
} from './dtos/create-event-category-dto';
import {
  UpdateEventCategoryRequestDto,
  UpdateEventCategoryResponseDto,
  mapFromUpdateEventCategoryDtoToModel,
} from './dtos/update-event-category-dto';
import { DeleteEventCategoryResponseDto } from './dtos/delete-event-category-dto';

export class EventsCategoriesRoutes {
  private readonly baseUrl = `${environment.apiUrl}events-categories`;
  private readonly httpClient = inject(HttpClient);

  public getAll(search: string, page: number, limit: number): string {
    return (
      this.baseUrl +
      `?search=${encodeURIComponent(search)}` +
      `&page=${page}` +
      `&limit=${limit}`
    );
  }

  public getOne(id: string): string {
    return `${this.baseUrl}/${id}`;
  }

  public create(body: CreateEventCategoryRequestDto): Observable<EventCategoryModel> {
    return this.httpClient
      .post<CreateEventCategoryResponseDto>(this.baseUrl, body)
      .pipe(map((dto) => mapFromCreateEventCategoryDtoToModel(dto)));
  }

  public update(
    id: string,
    body: UpdateEventCategoryRequestDto,
  ): Observable<EventCategoryModel> {
    return this.httpClient
      .patch<UpdateEventCategoryResponseDto>(`${this.baseUrl}/${id}`, body)
      .pipe(map((dto) => mapFromUpdateEventCategoryDtoToModel(dto)));
  }

  public delete(id: string): Observable<DeleteEventCategoryResponseDto> {
    return this.httpClient.delete<DeleteEventCategoryResponseDto>(
      `${this.baseUrl}/${id}`,
    );
  }
}
