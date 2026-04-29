import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthenticationsService } from './authentications.service';
import { mapFromRegisterRequestDtoToUser, RegisterRequestDto } from './dtos/register-request.dto';
import { LoginRequestDto } from './dtos/login-request.dto';
import type { Response } from 'express';
import { RefreshGuard } from './guards/refresh.guard';
import { GetMeResponseDto } from './dtos/get-me.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserData } from 'src/users/user-data.decorator';
import { RefreshTokenPayload } from 'src/utils/tokens/tokens.service';
import type { AccessTokenPayload } from 'src/utils/tokens/tokens.service';

@Controller('authentications')
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService
  ) {}

  @Post('register')
  @ApiBody({
    type: RegisterRequestDto,
    description: 'Register request body',
  })
  @ApiResponse({
    status: 201,
    description: 'Registration successful',
  })
  async register(@Body() body: RegisterRequestDto): Promise<void> {
    await this.authenticationsService.register(mapFromRegisterRequestDtoToUser(body));
  }

  @Post('login')
  @ApiBody({
    type: LoginRequestDto,
    description: 'Login request body',
  })
  async login(
    @Body() body: LoginRequestDto,
    @Res() res: Response,
  ): Promise<Response> {
    const { accessToken, refreshToken } = await this.authenticationsService.login(
      body.email,
      body.password,
      body.rememberMe,
    );
    res = this.prepareAccessTokenCookie(accessToken, res);
    res = this.prepareRefreshTokenCookie(refreshToken, res);
    return res.status(200).send({
      message: 'Login successful',
    });
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(
    @Res() res: Response,
    @RefreshTokenPayload() user: RefreshTokenPayload,
  ): Promise<Response> {
    const accessToken = await this.authenticationsService.refreshTokens(
      user.id,
    );
    return this.prepareAccessTokenCookie(accessToken, res)
      .status(200).send({
        message: 'Tokens refreshed successfully',
      });
  }

  @Get('me')
  @ApiResponse({
    status: 200,
    description: 'Get current user information',
    type: GetMeResponseDto,
  })
  @UseGuards(AuthGuard)
  async me(
    @UserData() user: AccessTokenPayload,
  ) {
    return new GetMeResponseDto(await this.authenticationsService.getMe(user.id));
  }

  private prepareAccessTokenCookie(
    accessToken: string,
    res: Response,
  ): Response {
    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
    });
    return res;
  }

  private prepareRefreshTokenCookie(
    refreshToken: string,
    res: Response,
  ): Response {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return res;
  }
}
