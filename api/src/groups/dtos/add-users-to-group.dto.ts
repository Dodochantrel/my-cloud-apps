import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Group } from '../group.entity';

export class AddUsersToGroupRequestDto {
  @ApiProperty({
    description: 'Liste des identifiants des utilisateurs à ajouter',
    example: ['uuid-1', 'uuid-2'],
    required: true,
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  @IsUUID('all', { each: true })
  userIds!: string[];
}

export class AddUsersToGroupResponseDto {
  @ApiProperty({ description: 'Identifiant du groupe', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Nom du groupe', example: 'Mon groupe' })
  name: string;

  @ApiProperty({
    description: 'Nombre total d\'utilisateurs dans le groupe',
    example: 5,
  })
  usersCount: number;

  constructor(group: Group) {
    this.id = group.id;
    this.name = group.name;
    this.usersCount = group.allMembers?.length ?? 0;
  }
}
