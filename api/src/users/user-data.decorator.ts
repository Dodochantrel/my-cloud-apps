import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { TokensService } from '../utils/tokens/tokens.service';

export const UserData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const authHeader = req?.headers?.authorization;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring('Bearer '.length);

      try {
        return TokensService.decodeAccessToken(token);
      } catch (error) {
        console.error('Failed to decode JWT:', error);
      }
    }

    return null;
  },
);
