import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Group } from '../group.entity';

export class CreateGroupRequestDto {
  @ApiProperty({
    description: 'Nom du groupe',
    example: 'Mon groupe',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateGroupResponseDto {
  @ApiProperty({ description: 'Identifiant du groupe', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Nom du groupe', example: 'Mon groupe' })
  name: string;

  constructor(group: Group) {
    this.id = group.id;
    this.name = group.name;
  }
}
