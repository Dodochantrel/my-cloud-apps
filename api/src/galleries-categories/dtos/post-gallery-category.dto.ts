import { ApiProperty } from "@nestjs/swagger";

export class PostGalleryCategoryBodyDto {
    @ApiProperty({ description: 'Nom de la catégorie', example: 'Vacances' })
    name!: string;

    @ApiProperty({ description: 'Identifiant de la catégorie parente (null pour une catégorie racine)', example: null })
    parentId!: string | null;
}