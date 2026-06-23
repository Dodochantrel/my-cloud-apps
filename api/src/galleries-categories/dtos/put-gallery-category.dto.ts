import { ApiProperty } from '@nestjs/swagger';

export class PutGalleryCategoryBodyDto {
  @ApiProperty({ description: 'Nom de la catégorie', example: 'Vacances' })
  name!: string;

  @ApiProperty({
    description:
      'Identifiant de la catégorie parente (null pour une catégorie racine)',
    example: null,
  })
  parentId!: string | null;

  @ApiProperty({
    description: 'Identifiants des groupes associés à la catégorie',
    example: ['group-id-1', 'group-id-2'],
  })
  groupsId!: string[];
}
