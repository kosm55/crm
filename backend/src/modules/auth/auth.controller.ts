import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseUserReqDto } from '../user/dto/req/base-user.req.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { SkipAuth } from './decorators/skip-auth.decorator';
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
  @Post('sign-up/manager')
  @ApiOperation({ summary: 'Sign up manager (only for admin)' })
  public async signUpManager(@Body() dto: BaseUserReqDto): Promise<AuthResDto> {
    return await this.authService.singUp(dto, RoleEnum.MANAGER);
  }

  @SkipAuth()
  @Post('login')
  @ApiOperation({ summary: 'Sign in' })
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
