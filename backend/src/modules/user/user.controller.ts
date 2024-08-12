import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleEnum } from '../auth/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IUserData } from '../auth/interfases/user-data.interface';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';
import { BaseUserResDto } from './dto/res/base-user.res.dto';
import { UserListResDto } from './dto/res/user-list.res.dto';
import { UserService } from './services/user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get('me')
  @ApiOperation({ summary: 'Get me' })
  public async getMe(
    @CurrentUser() userData: IUserData,
  ): Promise<BaseUserResDto> {
    return await this.userService.getMe(userData);
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  @ApiOperation({ summary: 'Get list of managers ' })
  public async getList(): Promise<UserListResDto> {
    return await this.userService.getList();
  }

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Put(':userId')
  @ApiOperation({ summary: 'Update some user (only for admin)' })
  public async update(
    @Body() updateUserDto: UpdateUserReqDto,
    @Param('userId') userId: string,
  ): Promise<string> {
    return `user ${userId} can be updated`;
  }
}
