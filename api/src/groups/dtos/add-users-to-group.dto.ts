import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Group } from '../group.entity';
import { GroupRole } from '../group-role.enum';

export class AddUserToGroupItemDto {
  @ApiProperty({
    description: 'Identifiant de l\'utilisateur',
    example: 'uuid-1',
  })
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: 'Rôle de l\'utilisateur dans le groupe',
    enum: GroupRole,
    example: GroupRole.MEMBER,
  })
  @IsNotEmpty()
  @IsEnum(GroupRole)
  role!: GroupRole;
}

export class AddUsersToGroupRequestDto {
  @ApiProperty({
    description: 'Liste des utilisateurs à ajouter avec leur rôle',
    type: [AddUserToGroupItemDto],
    example: [
      { userId: 'uuid-1', role: 'member' },
      { userId: 'uuid-2', role: 'moderator' },
    ],
    required: true,
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddUserToGroupItemDto)
  users!: AddUserToGroupItemDto[];
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
