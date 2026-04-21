import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EventModel } from '../../models/events/event-model';
import {
  CreateEventRequestDto,
  CreateEventResponseDto,
  mapFromCreateEventDtoToModel,
} from './dtos/create-event-dto';
import {
  UpdateEventRequestDto,
  UpdateEventResponseDto,
  mapFromUpdateEventDtoToModel,
} from './dtos/update-event-dto';
import { DeleteEventResponseDto } from './dtos/delete-event-dto';

export class EventsRoutes {
  private readonly baseUrl = `${environment.apiUrl}events`;
  private readonly httpClient = inject(HttpClient);

  public getAll(search: string, page: number, limit: number, startDate?: Date, endDate?: Date): string {
    return (
      this.baseUrl +
      `?search=${encodeURIComponent(search)}` +
      `&page=${page}` +
      `&limit=${limit}` +
      (startDate ? `&startDate=${startDate.toISOString()}` : '') +
      (endDate ? `&endDate=${endDate.toISOString()}` : '')
    );
  }

  public getOne(id: string): string {
    return `${this.baseUrl}/${id}`;
  }

  public create(body: CreateEventRequestDto): Observable<EventModel> {
    return this.httpClient
      .post<CreateEventResponseDto>(this.baseUrl, body)
      .pipe(map((dto) => mapFromCreateEventDtoToModel(dto)));
  }

  public update(id: string, body: UpdateEventRequestDto): Observable<EventModel> {
    return this.httpClient
      .patch<UpdateEventResponseDto>(`${this.baseUrl}/${id}`, body)
      .pipe(map((dto) => mapFromUpdateEventDtoToModel(dto)));
  }

  public delete(id: string): Observable<DeleteEventResponseDto> {
    return this.httpClient.delete<DeleteEventResponseDto>(`${this.baseUrl}/${id}`);
  }
}
