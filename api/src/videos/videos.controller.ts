import { Controller, Get, Param, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { GetAllVideoQueryDto } from './dtos/get-all-video.dto';
import { GetOneVideoParamDto } from './dtos/get-one-video.dto';
import { GetCastingVideoParamDto } from './dtos/get-casting-video.dto';
import { GetDirectorVideoParamDto } from './dtos/get-director-video.dto';
import { GetTrailerVideoParamDto } from './dtos/get-trailer-video.dto';
import { GetProvidersVideoParamDto } from './dtos/get-providers-video.dto';
import { GetCurrentVideoQueryDto } from './dtos/get-current-video.dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async getAllVideos(@Query() query: GetAllVideoQueryDto) {
    return this.videosService.getAll(query.type, query.search);
  }

  @Get('current')
  async getCurrentVideo(@Query() query: GetCurrentVideoQueryDto) {
    return this.videosService.getCurrent(query.type, query);
  }

  @Get(':id')
  async getVideoById(
    @Param('id') id: string,
    @Query() dto: GetOneVideoParamDto,
  ) {
    return await this.videosService.getByExternalId(id, dto.type);
  }

  @Get(':id/castings')
  async getCastings(
    @Param('id') id: string,
    @Query() dto: GetCastingVideoParamDto,
  ) {
    return this.videosService.getCastings(id, dto.type);
  }

  @Get(':id/director')
  async getDirector(
    @Param('id') id: string,
    @Query() dto: GetDirectorVideoParamDto,
  ) {
    return this.videosService.getDirector(id, dto.type);
  }

  @Get(':id/trailer')
  async getTrailer(
    @Param('id') id: string,
    @Query() dto: GetTrailerVideoParamDto,
  ) {
    const url = await this.videosService.getTrailer(id, dto.type);
    return { url };
  }

  @Get(':id/providers')
  async getProviders(
    @Param('id') id: string,
    @Query() dto: GetProvidersVideoParamDto,
  ) {
    return this.videosService.getProviders(id, dto.type);
  }

  @Get(':id/seasons')
  async getSeasons(@Param('id') id: string) {
    return this.videosService.getSeasons(id);
  }
}
