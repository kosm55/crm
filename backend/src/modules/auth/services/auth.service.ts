import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { AppConfig, Config } from '../../../configs/configs.type';
import { Token } from '../../../database/models/tokens.schema';
import { UserMapper } from '../../user/services/user.mapper';
import { UserService } from '../../user/services/user.service';
import { CreatePasswordReqDto } from '../dto/req/create-password.req.dto';
import { CreateUserReqDto } from '../dto/req/create-user.req.dto';
import { SignInReqDto } from '../dto/req/sign-in.req.dto';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { TokenPairResDto } from '../dto/res/token-pair.res.dto';
import { RoleEnum } from '../enums/role.enum';
import { TokenType } from '../enums/token-type.enum';
import { IUserData } from '../interfases/user-data.interface';
import { AuthMapper } from './auth.mapper';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  private readonly jwtConfig: AppConfig;
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
  ) {
    this.jwtConfig = configService.get<AppConfig>('app');
  }

  public async signUp(dto: CreateUserReqDto, role: RoleEnum): Promise<any> {
    await this.userService.isEmailUniqueOrThrow(dto.email);

    const user = await this.userService.createUser({
      ...dto,
      role,
      password: null,
    });

    return UserMapper.toResponseDTO(user);
  }

  public async getActionToken(userId: string): Promise<any> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const activationToken = await this.tokenService.generateActionToken({
      userId,
      role: user.role,
    });
    const updatedUser = await this.userService.updateUser(userId, {
      activationToken,
    });

    return UserMapper.toResponseActivatedDTO(updatedUser);
  }

  public async activateManager(
    dto: CreatePasswordReqDto,
    token: string,
  ): Promise<any> {
    const payload = await this.tokenService.verifyToken(
      token,
      TokenType.ACTIVATE,
    );

    const user = await this.userService.findById(payload.userId);
    if (user.isActive) {
      throw new UnauthorizedException('User is already activated');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 7);
    await this.userService.updateUserPassword(payload.userId, hashedPassword);
    await this.userService.activateUser(payload.userId);
    await this.userService.deleteActivationToken(payload.userId);
    const activatedUser = await this.userService.findById(payload.userId);
    return UserMapper.toResponseDTO(activatedUser);
  }

  public async getRecoveryToken(userId: string): Promise<any> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const recoveryToken = await this.tokenService.generateRecoveryToken({
      userId,
      role: user.role,
    });
    const updatedUser = await this.userService.updateUser(userId, {
      recoveryToken,
    });

    return UserMapper.toResponseRecoveryADTO(updatedUser);
  }

  public async recoveryPassword(
    dto: CreatePasswordReqDto,
    token: string,
  ): Promise<any> {
    const payload = await this.tokenService.verifyToken(
      token,
      TokenType.RECOVERY,
    );
    const hashedPassword = await bcrypt.hash(dto.password, 7);
    await this.userService.updateUserPassword(payload.userId, hashedPassword);
    await this.userService.activateUser(payload.userId);
    await this.userService.deleteRecoveryToken(payload.userId);
    const recoveryUser = await this.userService.findById(payload.userId);
    return UserMapper.toResponseDTO(recoveryUser);
  }

  public async signIn(dto: SignInReqDto): Promise<AuthResDto> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.isBanned) {
      throw new UnauthorizedException('Manager is baned');
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
