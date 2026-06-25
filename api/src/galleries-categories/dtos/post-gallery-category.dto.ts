import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PostGalleryCategoryBodyDto {
  @ApiProperty({ description: 'Nom de la catégorie', example: 'Vacances' })
  @IsString()
  name!: string;

  @ApiProperty({
    description:
      'Identifiant de la catégorie parente (null pour une catégorie racine)',
    example: null,
  })
  @IsOptional()
  parentId!: string | null;

  @ApiProperty({
    description: 'Identifiants des groupes associés à la catégorie',
    example: ['group-id-1', 'group-id-2'],
  })
  @IsString({ each: true })
  groupsId!: string[];
}
