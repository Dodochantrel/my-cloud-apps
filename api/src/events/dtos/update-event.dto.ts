import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Event } from '../event.entity';
import { EventCategorySummaryDto } from './get-all-events.dto';

export class UpdateEventRequestDto {
  @ApiPropertyOptional({
    description: 'Nouveau titre de l\'événement',
    example: 'Réunion modifiée',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Événement sur toute la journée',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  allDay?: boolean;

  @ApiPropertyOptional({
    description: 'Nouvelle date de début',
    example: '2026-04-17T10:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start?: Date;

  @ApiPropertyOptional({
    description: 'Nouvelle date de fin',
    example: '2026-04-17T12:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  end?: Date;

  @ApiPropertyOptional({
    description: 'Identifiant de la catégorie (null pour retirer)',
    example: 'uuid',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string | null;
}

export class UpdateEventResponseDto {
  @ApiProperty({ description: 'Identifiant de l\'événement', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Titre de l\'événement' })
  title: string;

  @ApiProperty({ description: 'Événement sur toute la journée' })
  allDay: boolean;

  @ApiProperty({ description: 'Date de début' })
  start: Date;

  @ApiProperty({ description: 'Date de fin' })
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
