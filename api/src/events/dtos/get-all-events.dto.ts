import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageQuery } from 'src/pagination/page-query';
import { Event } from '../event.entity';
import { Group } from 'src/groups/group.entity';

export class GroupSummaryDto {
  @ApiProperty({ description: 'Identifiant du groupe', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Nom du groupe', example: 'Équipe A' })
  name: string;

  constructor(group: Group) {
    this.id = group.id;
    this.name = group.name;
  }
}

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
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiPropertyOptional({
    description: 'Date de fin pour filtrer les événements',
    example: '2026-04-30T23:59:59.999Z',
  })
  @IsOptional()
  @IsString()
  endDate?: string;

  get startDateAsDate(): Date | undefined {
    if (!this.startDate) {
      return undefined;
    }
    return new Date(this.startDate);
  }

  get endDateAsDate(): Date | undefined {
    if (!this.endDate) {
      return undefined;
    }
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

  @ApiProperty({ description: 'Groupes associés à l\'événement', type: [GroupSummaryDto] })
  groups: GroupSummaryDto[];

  constructor(event: Event) {
    this.id = event.id;
    this.title = event.title;
    this.allDay = event.allDay;
    this.start = event.start;
    this.end = event.end;
    this.category = event.category
      ? new EventCategorySummaryDto(event.category)
      : null;
    this.groups = (event.groups ?? []).map((g) => new GroupSummaryDto(g));
  }
}

export function toGetAllEventsResponseDtoList(
  events: Event[],
): GetAllEventsResponseDto[] {
  return events.map((e) => new GetAllEventsResponseDto(e));
}
