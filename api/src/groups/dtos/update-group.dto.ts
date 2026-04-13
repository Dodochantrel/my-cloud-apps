import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Group } from '../group.entity';

export class UpdateGroupRequestDto {
  @ApiProperty({
    description: 'Nouveau nom du groupe',
    example: 'Nouveau nom',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}

export class UpdateGroupResponseDto {
  @ApiProperty({ description: 'Identifiant du groupe', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Nom du groupe', example: 'Nouveau nom' })
  name: string;

  constructor(group: Group) {
    this.id = group.id;
    this.name = group.name;
  }
}
