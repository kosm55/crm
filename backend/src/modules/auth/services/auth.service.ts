import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { Token } from '../../../database/models/tokens.schema';
import { BaseUserReqDto } from '../../user/dto/req/base-user.req.dto';
import { UserService } from '../../user/services/user.service';
import { SignInReqDto } from '../dto/req/sign-in.req.dto';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { TokenPairResDto } from '../dto/res/token-pair.res.dto';
import { RoleEnum } from '../enums/role.enum';
import { IUserData } from '../interfases/user-data.interface';
import { AuthMapper } from './auth.mapper';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
  ) {}

  public async singUp(
    dto: BaseUserReqDto,
    role: RoleEnum,
  ): Promise<AuthResDto> {
    await this.userService.isEmailUniqueOrThrow(dto.email);

    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({
      ...dto,
      role,
      password,
    });

    const pair = await this.tokenService.generateAuthTokens({
      userId: user._id.toString(),
      role,
    });

    await this.tokenService.saveTokens({
      userId: user._id.toString(),
      accessToken: pair.accessToken,
      refreshToken: pair.refreshToken,
    });
    return AuthMapper.toResponseDTO(user, pair);
  }

  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.password) {
      throw new UnauthorizedException('Password is missing');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const pair = await this.tokenService.generateAuthTokens({
      userId: user._id.toString(),
      role: user.role,
    });

    await this.tokenService.deleteTokens(user._id.toString());

    await this.tokenService.saveTokens({
      userId: user._id.toString(),
      accessToken: pair.accessToken,
      refreshToken: pair.refreshToken,
    });

    const userEntity = await this.userService.findById(user._id.toString());
    return AuthMapper.toResponseDTO(userEntity, pair);
  }

  public async refresh(userData: IUserData): Promise<TokenPairResDto> {
    if (!userData || !userData.userId) {
      throw new UnauthorizedException('User data is missing');
    }

    await this.tokenModel.deleteMany({
      user_id: userData.userId,
    });
    const pair = await this.tokenService.generateAuthTokens({
      userId: userData.userId,
      role: userData.role,
    });
    await this.tokenService.saveTokens({
      userId: userData.userId,
      accessToken: pair.accessToken,
      refreshToken: pair.refreshToken,
    });
    return AuthMapper.toResponseTokensDTO(pair);
  }
  public async signOut(userData: IUserData): Promise<void> {
    await this.tokenModel.deleteMany({
      userId: userData.userId,
    });
  }
}
