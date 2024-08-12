import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserService } from '../../user/services/user.service';
import { SKIP_AUTH } from '../constants/constants';
import { TokenType } from '../enums/token-type.enum';
import { AuthMapper } from '../services/auth.mapper';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();
    const accessToken = request.get('Authorization')?.split('Bearer ')[1];

    if (!accessToken) {
      throw new UnauthorizedException('Access token is missing');
    }

    const accessPayload = await this.tokenService.verifyToken(
      accessToken,
      TokenType.ACCESS,
    );

    if (!accessPayload) {
      throw new UnauthorizedException('Invalid access token');
    }

    const isExist = await this.tokenService.isAccessTokenExist(accessToken);
    if (!isExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findById(accessPayload.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.user = AuthMapper.toUserDataDTO(user);
    return true;
  }
}
