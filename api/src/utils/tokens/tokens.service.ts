import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { jwtDecode } from 'jwt-decode';
import type { StringValue } from 'ms';

@Injectable()
export class TokensService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  generateAccessToken(id: string, email: string, roles: string[]): Promise<string> {
    const payload: AccessTokenPayload = { id, email, roles };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<StringValue>('JWT_ACCESS_LIFETIME'),
    });
  }

  generateRefreshToken(id: string, rememberMe: boolean): Promise<string> {
    const payload: RefreshTokenPayload = { id };
    const lifetime = rememberMe
      ? this.configService.get<StringValue>('JWT_REFRESH_LIFETIME_REMEMBER')
      : this.configService.get<StringValue>('JWT_REFRESH_LIFETIME');
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: lifetime,
    });
  }

  decodeAccessToken(token: string): AccessTokenPayload {
    return TokensService.decodeAccessToken(token);
  }

  static decodeAccessToken(token: string): AccessTokenPayload {
    return jwtDecode<AccessTokenPayload>(token);
  }
}

export interface AccessTokenPayload {
  id: string;
  email: string;
  roles: string[];
}

export interface RefreshTokenPayload {
  id: string;
}

export const TokenPayload = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  if (!request.headers.authorization) {
    return null;
  }
  const accessToken = request.headers.authorization.split(' ')[1];
  return jwtDecode<AccessTokenPayload>(accessToken);
});

export const RefreshTokenPayload = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const userFromGuard = request['user'] as RefreshTokenPayload | undefined;
  if (userFromGuard?.id) {
    return userFromGuard;
  }

  const cookies = request.cookies as Record<string, string> | undefined;
  if (!cookies?.['refreshToken']) {
    return null;
  }
  const refreshToken = cookies['refreshToken'];
  return jwtDecode<RefreshTokenPayload>(refreshToken);
});
