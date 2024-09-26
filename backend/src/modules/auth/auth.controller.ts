import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
import { CreatePasswordReqDto } from './dto/req/create-password.req.dto';
import { CreateUserReqDto } from './dto/req/create-user.req.dto';
import { SignInReqDto } from './dto/req/sign-in.req.dto';
import { AuthResDto } from './dto/res/auth.res.dto';
import { TokenPairResDto } from './dto/res/token-pair.res.dto';
import { RoleEnum } from './enums/role.enum';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RolesGuard } from './guards/roles.guard';
import { IUserData } from './interfases/user-data.interface';
import { AuthService } from './services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @Roles(RoleEnum.ADMIN)
  // @UseGuards(RolesGuard)
  // @ApiBearerAuth()
  // @Post('sign-up/admin')
  // @ApiOperation({ summary: 'Sign up admin (only for admin)' })
  // public async signUpAdmin(@Body() dto: BaseUserReqDto): Promise<AuthResDto> {
  //   return await this.authService.singUp(dto, RoleEnum.ADMIN);
  // }
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOperation({ summary: 'Create manager (only for admin)' })
  @Post('create-manager')
  public async signUpManager(@Body() dto: CreateUserReqDto): Promise<any> {
    return await this.authService.signUp(dto, RoleEnum.MANAGER);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Activate manager' })
  @Post('activate/:token')
  public async activateManager(
    @Body() dto: CreatePasswordReqDto,
    @Param('token') token: string,
  ): Promise<any> {
    return await this.authService.activateManager(dto, token);
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Recovery password request, get recovery token' })
  @Post('recovery-token/:userId')
  public async getRecoveryToken(@Param('userId') userId: string): Promise<any> {
    return await this.authService.getRecoveryToken(userId);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reset password' })
  @Post('recovery-password/:token')
  public async recoveryPassword(
    @Body() dto: CreatePasswordReqDto,
    @Param('token') token: string,
  ): Promise<any> {
    return await this.authService.recoveryPassword(dto, token);
  }
  @SkipAuth()
  @ApiOperation({ summary: 'Sign in' })
  @Post('login')
  public async signIn(@Body() dto: SignInReqDto): Promise<AuthResDto> {
    return await this.authService.signIn(dto);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Refresh token pair' })
  @Post('refresh')
  public async refresh(
    @CurrentUser() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Sign out' })
  @Post('sign-out')
  public async signOut(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.authService.signOut(userData);
  }
}
