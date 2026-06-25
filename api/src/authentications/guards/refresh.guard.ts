import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    const refreshToken = request.cookies?.['refreshToken'];
    if (refreshToken) {
      return refreshToken;
    }

    const cookieHeader = request.headers.cookie;
    if (!cookieHeader) {
      return undefined;
    }

    const rawRefreshToken = cookieHeader
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith('refreshToken='));

    return rawRefreshToken?.split('=')[1];
  }
}
