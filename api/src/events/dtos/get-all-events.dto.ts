import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageQuery } from 'src/pagination/page-query';
import { Event } from '../event.entity';

export class EventCategorySummaryDto {
  @ApiProperty({ description: 'Identifiant de la catégorie', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Nom de la catégorie', example: 'Sport' })
  name: string;

  @ApiProperty({ description: 'Couleur de la catégorie', example: '#FF5733' })
  color: string;

  constructor(category: { id: string; name: string; color: string }) {
    this.id = category.id;
    this.name = category.name;
    this.color = category.color;
  }
}

export class GetAllEventsQueryDto extends PageQuery {
  @ApiPropertyOptional({
    description: 'Recherche par titre d\'événement',
    example: 'Réunion',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Date de début pour filtrer les événements',
    example: '2026-04-01T00:00:00.000Z',
  })
  @IsString()
  startDate!: string;

  @ApiPropertyOptional({
    description: 'Date de fin pour filtrer les événements',
    example: '2026-04-30T23:59:59.999Z',
  })
  @IsString()
  endDate!: string;

  get startDateAsDate(): Date {
    return new Date(this.startDate);
  }

  get endDateAsDate(): Date {
    return new Date(this.endDate);
  }
}

export class GetAllEventsResponseDto {
  @ApiProperty({ description: 'Identifiant de l\'événement', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Titre de l\'événement', example: 'Réunion' })
  title: string;

  @ApiProperty({ description: 'Événement sur toute la journée', example: false })
  allDay: boolean;

  @ApiProperty({ description: 'Date de début', example: '2026-04-16T10:00:00.000Z' })
  start: Date;

  @ApiProperty({ description: 'Date de fin', example: '2026-04-16T12:00:00.000Z' })
  end: Date;

  @ApiPropertyOptional({ description: 'Catégorie de l\'événement', type: EventCategorySummaryDto })
  category: EventCategorySummaryDto | null;

  constructor(event: Event) {
    this.id = event.id;
    this.title = event.title;
    this.allDay = event.allDay;
    this.start = event.start;
    this.end = event.end;
    this.category = event.category
      ? new EventCategorySummaryDto(event.category)
      : null;
  }
}

export function toGetAllEventsResponseDtoList(
  events: Event[],
): GetAllEventsResponseDto[] {
  return events.map((e) => new GetAllEventsResponseDto(e));
}
