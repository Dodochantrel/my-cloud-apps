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
import { GroupsService } from './groups.service';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UserData } from 'src/users/user-data.decorator';
import type { AccessTokenPayload } from 'src/utils/tokens/tokens.service';
import { AuthGuard } from 'src/authentications/guards/auth.guard';
import {
  GetAllGroupsQueryDto,
  GetAllGroupsResponseDto,
  toGetAllGroupsResponseDtoList,
} from './dtos/get-all-groups.dto';
import { PaginatedResponse } from 'src/pagination/paginated-response';
import {
  CreateGroupRequestDto,
  CreateGroupResponseDto,
} from './dtos/create-group.dto';
import {
  AddUsersToGroupRequestDto,
  AddUsersToGroupResponseDto,
} from './dtos/add-users-to-group.dto';
import {
  UpdateGroupRequestDto,
  UpdateGroupResponseDto,
} from './dtos/update-group.dto';
import { DeleteGroupResponseDto } from './dtos/delete-group.dto';

@Controller('groups')
@UseGuards(AuthGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Liste paginée des groupes de l\'utilisateur.',
    type: [GetAllGroupsResponseDto],
  })
  async getAllGroups(
    @UserData() user: AccessTokenPayload,
    @Query() query: GetAllGroupsQueryDto,
  ): Promise<PaginatedResponse<GetAllGroupsResponseDto>> {
    const { items, total } = await this.groupsService.findAll(
      user.id,
      query,
      query.search,
    );
    return new PaginatedResponse(
      toGetAllGroupsResponseDtoList(items),
      query,
      total,
    );
  }

  @Post()
  @ApiBody({ type: CreateGroupRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Le groupe a été créé avec succès.',
    type: CreateGroupResponseDto,
  })
  async createGroup(
    @Body() dto: CreateGroupRequestDto,
    @UserData() user: AccessTokenPayload,
  ): Promise<CreateGroupResponseDto> {
    const group = await this.groupsService.create(dto.name, user.id, dto.users);
    return new CreateGroupResponseDto(group);
  }

  @Post(':id/users')
  @ApiBody({ type: AddUsersToGroupRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Les utilisateurs ont été ajoutés au groupe.',
    type: AddUsersToGroupResponseDto,
  })
  async addUsersToGroup(
    @Param('id') id: string,
    @Body() dto: AddUsersToGroupRequestDto,
    @UserData() user: AccessTokenPayload,
  ): Promise<AddUsersToGroupResponseDto> {
    const group = await this.groupsService.addUsers(id, dto.users, user.id);
    return new AddUsersToGroupResponseDto(group);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateGroupRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Le groupe a été modifié avec succès.',
    type: UpdateGroupResponseDto,
  })
  async updateGroup(
    @Param('id') id: string,
    @Body() dto: UpdateGroupRequestDto,
    @UserData() user: AccessTokenPayload,
  ): Promise<UpdateGroupResponseDto> {
    const { users, ...data } = dto;
    const group = await this.groupsService.update(id, user.id, data, users);
    return new UpdateGroupResponseDto(group);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Le groupe a été supprimé avec succès.',
    type: DeleteGroupResponseDto,
  })
  async deleteGroup(
    @Param('id') id: string,
    @UserData() user: AccessTokenPayload,
  ): Promise<DeleteGroupResponseDto> {
    await this.groupsService.delete(id, user.id);
    return new DeleteGroupResponseDto();
  }
}
