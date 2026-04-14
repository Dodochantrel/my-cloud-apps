import { UsersService } from './users.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/authentications/guards/auth.guard';
import { GetAllUsersQueryDto, GetAllUsersResponseDto } from './dtos/get-all-users.dto';
import { ApiPaginatedResponse } from 'src/pagination/response-paginated.decorator';
import { PaginatedResponse } from 'src/pagination/paginated-response';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiPaginatedResponse(GetAllUsersResponseDto)
    async getAllUsers(
        @Query() query: GetAllUsersQueryDto,
    ): Promise<PaginatedResponse<GetAllUsersResponseDto>> {
        const [data, total] = await this.usersService.findAll(query, query.search);
        return new PaginatedResponse(
            data.map(user => new GetAllUsersResponseDto(user)),
            query,
            total,
        );
    }
}
