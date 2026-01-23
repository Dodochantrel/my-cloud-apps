import { Controller, Get, Param, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { GetAllVideosQueryDto } from './dtos/get-all-videos-query.dto';

@Controller('videos')
export class VideosController {
    constructor(
        private readonly videosService: VideosService
    ) {}

    @Get()
    async getAllVideos(
        @Query() query: GetAllVideosQueryDto,
    ) {
        return this.videosService.getAll(query.type, query.search);
    }

    @Get(':id')
    async getVideoById(
        @Param('id') id: string,
    ) {
        return this.videosService.getByExternalId(id);
    }

    @Get(':id/castings')
    async getCastings(
        @Param('id') id: string,
    ) {
        return this.videosService.getCastings(id);
    }

    @Get(':id/director')
    async getDirector(
        @Param('id') id: string,
    ) {
        return this.videosService.getDirector(id);
    }

    @Get(':id/trailer')
    async getTrailer(
        @Param('id') id: string,
    ) {
        const url = await this.videosService.getTrailer(id);
        return { url };
    }

    @Get(':id/providers')
    async getProviders(
        @Param('id') id: string,
    ) {
        return this.videosService.getProviders(id);
    }
}
