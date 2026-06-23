import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { GalleriesService } from './galleries.service';
import { AuthGuard } from 'src/authentications/guards/auth.guard';
import { UserData } from 'src/users/user-data.decorator';
import type { AccessTokenPayload } from 'src/utils/tokens/tokens.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { CreateGalleryDto } from './dtos/create-gallery.dto';
import { GalleryResponseDto } from './dtos/gallery-response.dto';

@Controller('galleries')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class GalleriesController {
    constructor(private readonly galleriesService: GalleriesService) {}

    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Détail d’un élément de galerie avec URLs signées.',
        type: GalleryResponseDto,
    })
    async getOne(
        @Param('id', ParseUUIDPipe) id: string,
        @UserData() user: AccessTokenPayload,
    ): Promise<GalleryResponseDto> {
        const gallery = await this.galleriesService.findOneOrFail(id, user.id);
        const urls = await this.galleriesService.getUrls(gallery);
        return new GalleryResponseDto(gallery, urls);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            required: ['categoryId', 'file'],
            properties: {
                categoryId: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                file: { type: 'string', format: 'binary' },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Élément de galerie créé et envoyé dans SeaweedFS.',
        type: GalleryResponseDto,
    })
    async create(
        @Body() body: CreateGalleryDto,
        @UploadedFile() file: { buffer: Buffer; mimetype: string; size: number; originalname: string },
        @UserData() user: AccessTokenPayload,
    ): Promise<GalleryResponseDto> {
        const gallery = await this.galleriesService.create(body, user.id, file);
        const urls = await this.galleriesService.getUrls(gallery);
        return new GalleryResponseDto(gallery, urls);
    }

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'Élément de galerie supprimé de la BDD et de SeaweedFS.',
    })
    async delete(
        @Param('id', ParseUUIDPipe) id: string,
        @UserData() user: AccessTokenPayload,
    ): Promise<{ message: string }> {
        await this.galleriesService.delete(id, user.id);
        return { message: 'Élément de galerie supprimé.' };
    }
}
