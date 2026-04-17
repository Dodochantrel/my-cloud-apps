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
import { EventsService } from './events.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/authentications/guards/auth.guard';
import {
  GetAllEventsQueryDto,
  GetAllEventsResponseDto,
  toGetAllEventsResponseDtoList,
} from './dtos/get-all-events.dto';
import { PaginatedResponse } from 'src/pagination/paginated-response';
import {
  CreateEventRequestDto,
  CreateEventResponseDto,
} from './dtos/create-event.dto';
import {
  UpdateEventRequestDto,
  UpdateEventResponseDto,
} from './dtos/update-event.dto';
import { DeleteEventResponseDto } from './dtos/delete-event.dto';

@Controller('events')
@UseGuards(AuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Liste paginée des événements.',
    type: [GetAllEventsResponseDto],
  })
  async getAllEvents(
    @Query() query: GetAllEventsQueryDto,
  ): Promise<PaginatedResponse<GetAllEventsResponseDto>> {
    const { items, total } = await this.eventsService.findAll(
      query,
      query.startDateAsDate,
      query.endDateAsDate,
      query.search,
    );
    return new PaginatedResponse(
      toGetAllEventsResponseDtoList(items),
      query,
      total,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Détail d\'un événement.',
    type: GetAllEventsResponseDto,
  })
  async getEvent(
    @Param('id') id: string,
  ): Promise<GetAllEventsResponseDto> {
    const event = await this.eventsService.findOne(id);
    return new GetAllEventsResponseDto(event);
  }

  @Post()
  @ApiBody({ type: CreateEventRequestDto })
  @ApiResponse({
    status: 201,
    description: 'L\'événement a été créé avec succès.',
    type: CreateEventResponseDto,
  })
  async createEvent(
    @Body() dto: CreateEventRequestDto,
  ): Promise<CreateEventResponseDto> {
    const { categoryId, ...data } = dto;
    const event = await this.eventsService.create(data, categoryId);
    return new CreateEventResponseDto(event);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateEventRequestDto })
  @ApiResponse({
    status: 200,
    description: 'L\'événement a été modifié avec succès.',
    type: UpdateEventResponseDto,
  })
  async updateEvent(
    @Param('id') id: string,
    @Body() dto: UpdateEventRequestDto,
  ): Promise<UpdateEventResponseDto> {
    const { categoryId, ...data } = dto;
    const event = await this.eventsService.update(id, data, categoryId);
    return new UpdateEventResponseDto(event);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'L\'événement a été supprimé avec succès.',
    type: DeleteEventResponseDto,
  })
  async deleteEvent(
    @Param('id') id: string,
  ): Promise<DeleteEventResponseDto> {
    await this.eventsService.delete(id);
    return new DeleteEventResponseDto();
  }
}
