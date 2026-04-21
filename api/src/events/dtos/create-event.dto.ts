import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Event } from '../event.entity';
import { EventCategorySummaryDto, GroupSummaryDto } from './get-all-events.dto';

export class CreateEventRequestDto {
  @ApiProperty({
    description: 'Titre de l\'événement',
    example: 'Réunion d\'équipe',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Événement sur toute la journée',
    example: false,
    required: true,
  })
  @IsBoolean()
  allDay!: boolean;

  @ApiProperty({
    description: 'Date de début',
    example: '2026-04-16T10:00:00.000Z',
    required: true,
  })
  @Type(() => Date)
  @IsDate()
  start!: Date;

  @ApiProperty({
    description: 'Date de fin',
    example: '2026-04-16T12:00:00.000Z',
    required: true,
  })
  @Type(() => Date)
  @IsDate()
  end!: Date;

  @ApiPropertyOptional({
    description: 'Identifiant de la catégorie',
    example: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Identifiants des groupes associés',
    example: ['uuid1', 'uuid2'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  groupsId?: string[];
}

export class CreateEventResponseDto {
  @ApiProperty({ description: 'Identifiant de l\'événement', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Titre de l\'événement', example: 'Réunion d\'équipe' })
  title: string;

  @ApiProperty({ description: 'Événement sur toute la journée', example: false })
  allDay: boolean;

  @ApiProperty({ description: 'Date de début' })
  start: Date;

  @ApiProperty({ description: 'Date de fin' })
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
