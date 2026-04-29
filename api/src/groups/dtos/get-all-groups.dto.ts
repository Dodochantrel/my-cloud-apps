import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageQuery } from 'src/pagination/page-query';
import { Group } from '../group.entity';
import { User } from 'src/users/user.entity';

export class GroupUserSummaryDto {
  @ApiProperty({ description: 'Identifiant de l\'utilisateur', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Prénom de l\'utilisateur', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'Nom de l\'utilisateur', example: 'Doe' })
  lastName: string;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}

export class GetAllGroupsQueryDto extends PageQuery {
  @ApiPropertyOptional({
    description: 'Recherche par nom de groupe',
    example: 'Mon groupe',
  })
  @IsOptional()
  @IsString()
  search?: string;
}

export class GetAllGroupsResponseDto {
  @ApiProperty({ description: 'Identifiant du groupe', example: 'uuid' })
  id: string;

  @ApiProperty({ description: 'Nom du groupe', example: 'Mon groupe' })
  name: string;

  @ApiProperty({
    description: 'Administrateur du groupe',
    type: GroupUserSummaryDto,
  })
  admin: GroupUserSummaryDto;

  @ApiProperty({
    description: 'Liste des modérateurs du groupe',
    type: [GroupUserSummaryDto],
  })
  moderators: GroupUserSummaryDto[];

  @ApiProperty({
    description: 'Liste des utilisateurs du groupe (hors admin/modérateurs)',
    type: [GroupUserSummaryDto],
  })
  users: GroupUserSummaryDto[];

  constructor(group: Group) {
    this.id = group.id;
    this.name = group.name;
    this.admin = new GroupUserSummaryDto(group.admin);
    this.moderators = (group.moderators ?? []).map(
      (user) => new GroupUserSummaryDto(user),
    );
    this.users = (group.members ?? []).map((user) => new GroupUserSummaryDto(user));
  }
}

export function toGetAllGroupsResponseDtoList(
  groups: Group[],
): GetAllGroupsResponseDto[] {
  return groups.map((group) => new GetAllGroupsResponseDto(group));
}
