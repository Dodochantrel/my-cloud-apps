import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { VideosService } from './videos.service';
import { GetAllVideoQueryDto } from './dtos/get-all-video.dto';
import { GetOneVideoParamDto } from './dtos/get-one-video.dto';
import { GetCastingVideoParamDto } from './dtos/get-casting-video.dto';
import { GetDirectorVideoParamDto } from './dtos/get-director-video.dto';
import { GetTrailerVideoParamDto } from './dtos/get-trailer-video.dto';
import { GetProvidersVideoParamDto } from './dtos/get-providers-video.dto';
import { GetCurrentVideoQueryDto } from './dtos/get-current-video.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import {
  mapFromPatchVideoReviewRequestDtoToVideoReview,
  PatchVideoReviewRequestDto,
  PatchVideoReviewResponseDto,
} from './dtos/patch-video-review.dto';
import { UserData } from 'src/users/user-data.decorator';
import type { AccessTokenPayload } from 'src/utils/tokens/tokens.service';
import { GetVideoReviewResponseDto } from './dtos/get-video-review.dto';

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
    @Query() query: GetOneVideoParamDto,
  ) {
    return await this.videosService.getByid(id, query.type);
  }

  @Get(':id/castings')
  async getCastings(
    @Param('id') id: string,
    @Query() query: GetCastingVideoParamDto,
  ) {
    return this.videosService.getCastings(id, query.type);
  }

  @Get(':id/director')
  async getDirector(
    @Param('id') id: string,
    @Query() query: GetDirectorVideoParamDto,
  ) {
    return this.videosService.getDirector(id, query.type);
  }

  @Get(':id/trailer')
  async getTrailer(
    @Param('id') id: string,
    @Query() query: GetTrailerVideoParamDto,
  ) {
    const url = await this.videosService.getTrailer(id, query.type);
    return { url };
  }

  @Get(':id/providers')
  async getProviders(
    @Param('id') id: string,
    @Query() query: GetProvidersVideoParamDto,
  ) {
    return this.videosService.getProviders(id, query.type);
  }

  @Get(':id/seasons')
  async getSeasons(@Param('id') id: string) {
    return this.videosService.getSeasons(id);
  }

  @Get(':videoId/reviews')
  @ApiResponse({
    status: 200,
    description: 'The reviews have been successfully retrieved.',
    type: GetVideoReviewResponseDto,
  })
  async getReviews(
    @Param('videoId') videoId: string,
    @Query() query: GetOneVideoParamDto,
    @UserData() user: AccessTokenPayload,
  ): Promise<GetVideoReviewResponseDto> {
    return new GetVideoReviewResponseDto(
      await this.videosService.getReview(videoId, user.id, query.type),
    );
  }

  @Patch(':videoId/reviews')
  @ApiBody({
    type: PatchVideoReviewRequestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The review has been successfully updated.',
    type: PatchVideoReviewResponseDto,
  })
  async update(
    @Param('videoId') videoId: string,
    @Body() dto: PatchVideoReviewRequestDto,
    @UserData() user: AccessTokenPayload,
  ): Promise<PatchVideoReviewResponseDto> {
    return new PatchVideoReviewResponseDto(
      await this.videosService.update(
        videoId,
        user.id,
        mapFromPatchVideoReviewRequestDtoToVideoReview(dto),
      ),
    );
  }
}
