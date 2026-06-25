import { Controller, Delete, Get, Post, Put, Body, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GalleriesCategoriesService } from './galleries-categories.service';
import { UserData } from 'src/users/user-data.decorator';
import type { AccessTokenPayload } from 'src/utils/tokens/tokens.service';
import { PageQuery } from 'src/pagination/page-query';
import { PaginatedResponse } from 'src/pagination/paginated-response';
import {
  GetAllGalleriesCategoriesResponseDto,
  GetAllGalleryCategoriesQueryDto,
  mapFromGalleryCategoryToGetAllGalleriesCategoriesResponseDto,
} from './dtos/get-all-gallery-category.dto';
import { PostGalleryCategoryBodyDto } from './dtos/post-gallery-category.dto';
import { PutGalleryCategoryBodyDto } from './dtos/put-gallery-category.dto';

@ApiTags('Galleries Categories')
@ApiBearerAuth()
@Controller('galleries-categories')
export class GalleriesCategoriesController {
  constructor(private readonly galleriesCategoriesService: GalleriesCategoriesService) {}

  @Get()
  @ApiOperation({ summary: "Récupérer toutes les catégories accessibles par l'utilisateur" })
  async getAll(
    @UserData() user: AccessTokenPayload,
    @Query() query: GetAllGalleryCategoriesQueryDto,
  ): Promise<PaginatedResponse<GetAllGalleriesCategoriesResponseDto>> {
    const pageQuery = new PageQuery(query.page, query.limit);
    const { items, total } = await this.galleriesCategoriesService.getAll(user.id, pageQuery, query.search);
    return new PaginatedResponse(mapFromGalleryCategoryToGetAllGalleriesCategoriesResponseDto(items), pageQuery, total);
  }

  @Get(':id/galleries')
  @ApiOperation({ summary: 'Récupérer les galeries d’une catégorie' })
  async getGalleriesForCategory(@UserData() user: AccessTokenPayload, @Param('id', ParseUUIDPipe) id: string) {
    return this.galleriesCategoriesService.getGalleriesForCategory(id, user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une catégorie et son sous-arbre' })
  async getOne(@UserData() user: AccessTokenPayload, @Param('id', ParseUUIDPipe) id: string) {
    return this.galleriesCategoriesService.getOne(id, user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une catégorie' })
  async create(@UserData() user: AccessTokenPayload, @Body() body: PostGalleryCategoryBodyDto) {
    return this.galleriesCategoriesService.create(user.id, body.name, body.parentId, body.groupsId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une catégorie' })
  async update(
    @UserData() user: AccessTokenPayload,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: PutGalleryCategoryBodyDto,
  ) {
    return this.galleriesCategoriesService.update(id, user.id, body.name, body.parentId, body.groupsId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une catégorie et ses enfants' })
  async delete(@UserData() user: AccessTokenPayload, @Param('id', ParseUUIDPipe) id: string) {
    return this.galleriesCategoriesService.delete(id, user.id);
  }
}
