import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Group } from '../group.entity';
import { AddUserToGroupItemDto } from './add-users-to-group.dto';
import { GroupUserSummaryDto } from './get-all-groups.dto';

export class UpdateGroupRequestDto {
  @ApiProperty({
    description: 'Nouveau nom du groupe',
    example: 'Nouveau nom',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Liste des utilisateurs du groupe avec leur rôle (remplace la liste existante)',
    type: [AddUserToGroupItemDto],
    required: false,
    example: [
      { userId: 'uuid-1', role: 'admin' },
      { userId: 'uuid-2', role: 'member' },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddUserToGroupItemDto)
  users?: AddUserToGroupItemDto[];
}

export class UpdateGroupResponseDto {
  @ApiProperty({ description: 'Identifiant du groupe', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Nom du groupe', example: 'Nouveau nom' })
  name: string;

  @ApiProperty({ description: 'Administrateur du groupe', type: GroupUserSummaryDto })
  admin: GroupUserSummaryDto;

  @ApiProperty({ description: 'Modérateurs du groupe', type: [GroupUserSummaryDto] })
  moderators: GroupUserSummaryDto[];

  @ApiProperty({ description: 'Membres du groupe', type: [GroupUserSummaryDto] })
  members: GroupUserSummaryDto[];

  constructor(group: Group) {
    this.id = group.id;
    this.name = group.name;
    this.admin = new GroupUserSummaryDto(group.admin);
    this.moderators = (group.moderators ?? []).map((u) => new GroupUserSummaryDto(u));
    this.members = (group.members ?? []).map((u) => new GroupUserSummaryDto(u));
  }
}
