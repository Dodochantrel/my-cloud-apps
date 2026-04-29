import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventsCategoriesService } from './events-categories.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentications/guards/auth.guard';
import {
  GetAllEventsCategoriesQueryDto,
  GetAllEventsCategoriesResponseDto,
  toGetAllEventsCategoriesResponseDtoList,
} from './dtos/get-all-events-categories.dto';
import { PaginatedResponse } from 'src/pagination/paginated-response';
import {
  CreateEventCategoryRequestDto,
  CreateEventCategoryResponseDto,
} from './dtos/create-event-category.dto';
import {
  UpdateEventCategoryRequestDto,
  UpdateEventCategoryResponseDto,
} from './dtos/update-event-category.dto';
import { DeleteEventCategoryResponseDto } from './dtos/delete-event-category.dto';

@Controller('events-categories')
@UseGuards(AuthGuard)
export class EventsCategoriesController {
  constructor(
    private readonly eventsCategoriesService: EventsCategoriesService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Liste paginée des catégories d\'événements.',
    type: [GetAllEventsCategoriesResponseDto],
  })
  async getAllCategories(
    @Query() query: GetAllEventsCategoriesQueryDto,
  ): Promise<PaginatedResponse<GetAllEventsCategoriesResponseDto>> {
    const { items, total } = await this.eventsCategoriesService.findAll(
      query,
      query.search,
    );
    return new PaginatedResponse(
      toGetAllEventsCategoriesResponseDtoList(items),
      query,
      total,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Détail d\'une catégorie d\'événement.',
    type: GetAllEventsCategoriesResponseDto,
  })
  async getCategory(
    @Param('id') id: string,
  ): Promise<GetAllEventsCategoriesResponseDto> {
    const category = await this.eventsCategoriesService.findOne(id);
    return new GetAllEventsCategoriesResponseDto(category);
  }

  @Post()
  @ApiBody({ type: CreateEventCategoryRequestDto })
  @ApiResponse({
    status: 201,
    description: 'La catégorie a été créée avec succès.',
    type: CreateEventCategoryResponseDto,
  })
  async createCategory(
    @Body() dto: CreateEventCategoryRequestDto,
  ): Promise<CreateEventCategoryResponseDto> {
    const category = await this.eventsCategoriesService.create(
      dto.name,
      dto.color,
    );
    return new CreateEventCategoryResponseDto(category);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateEventCategoryRequestDto })
  @ApiResponse({
    status: 200,
    description: 'La catégorie a été modifiée avec succès.',
    type: UpdateEventCategoryResponseDto,
  })
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateEventCategoryRequestDto,
  ): Promise<UpdateEventCategoryResponseDto> {
    const category = await this.eventsCategoriesService.update(id, dto);
    return new UpdateEventCategoryResponseDto(category);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'La catégorie a été supprimée avec succès.',
    type: DeleteEventCategoryResponseDto,
  })
  async deleteCategory(
    @Param('id') id: string,
  ): Promise<DeleteEventCategoryResponseDto> {
    await this.eventsCategoriesService.delete(id);
    return new DeleteEventCategoryResponseDto();
  }
}
