import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserService } from '../../user/services/user.service';
import { ROLES } from '../constants/constants';
import { RoleEnum } from '../enums/role.enum';
import { IUserData } from '../interfases/user-data.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<RoleEnum[]>(
      ROLES,
      context.getHandler(),
    );
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: IUserData = request.user;
    if (!user || !user.role) {
      throw new UnauthorizedException();
    }

    const userData = await this.userService.findById(user.userId);
    if (!userData) {
      throw new NotFoundException('User not found');
    }

    const userRole = userData.role as RoleEnum;
    if (!requiredRoles.includes(userRole)) {
      throw new UnauthorizedException('Access denied for user');
    }

    return true;
  }
}
