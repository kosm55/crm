import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleEnum } from '../auth/enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IUserData } from '../auth/interfases/user-data.interface';
import { UserListReqDto } from './dto/req/user-list.req.dto';
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
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get user by id' })
  public async getById(
    @Param('userId') userId: string,
  ): Promise<BaseUserResDto> {
    return await this.userService.getById(userId);
  }

  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Offset from the start',
  })
  @ApiOperation({ summary: 'Get list of managers ' })
  public async getList(
    @Query() query: UserListReqDto,
  ): Promise<UserListResDto> {
    return await this.userService.getList(query);
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOperation({ summary: 'Bun manager' })
  @Patch('ban/:userId')
  public async ban(@Param('userId') userId: string): Promise<string> {
    return await this.userService.banUser(userId);
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOperation({ summary: 'Unban manager' })
  @Patch('unban/:userId')
  public async unban(@Param('userId') userId: string): Promise<string> {
    return await this.userService.unbanUser(userId);
  }
}
