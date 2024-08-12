import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from '../../user/services/user.service';
import { TokenType } from '../enums/token-type.enum';
import { AuthMapper } from '../services/auth.mapper';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.get('Authorization')?.split('Bearer ')[1];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const refreshPayload = await this.tokenService.verifyToken(
      refreshToken,
      TokenType.REFRESH,
    );

    if (!refreshPayload) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isExist = await this.tokenService.isRefreshTokenExist(refreshToken);
    if (!isExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findById(refreshPayload.userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.user = AuthMapper.toUserDataDTO(user);
    return true;
  }
}
