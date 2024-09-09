import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Config, JWTConfig } from '../../../configs/configs.type';
import { Token } from '../../../database/models/tokens.schema';
import { TokenType } from '../enums/token-type.enum';
import { IJwtPayload } from '../interfases/jwt-payload.interface';
import { ITokenPair } from '../interfases/token-pair.interface';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JWTConfig;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
    @InjectModel(Token.name) private readonly tokenModel: Model<Token>,
  ) {
    this.jwtConfig = configService.get<JWTConfig>('jwt');
  }

  public async generateAuthTokens(payload: IJwtPayload): Promise<ITokenPair> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.accessSecret,
      expiresIn: this.jwtConfig.accessExpiresIn,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshSecret,
      expiresIn: this.jwtConfig.refreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }
  public async generateActionToken(payload: IJwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.activationSecret,
      expiresIn: this.jwtConfig.activationExpiresIn,
    });
  }
  public async generateRecoveryToken(payload: IJwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.recoverySecret,
      expiresIn: this.jwtConfig.recoveryExpiresIn,
    });
  }
  public async verifyToken(
    token: string,
    type: TokenType,
  ): Promise<IJwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.getSecret(type),
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException(' Token expired');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      }
      throw new UnauthorizedException('Error token');
    }
  }

  public getSecret(type: TokenType): string {
    let secret: string;
    switch (type) {
      case TokenType.ACCESS:
        secret = this.jwtConfig.accessSecret;
        break;
      case TokenType.REFRESH:
        secret = this.jwtConfig.refreshSecret;
        break;
      case TokenType.ACTIVATE:
        secret = this.jwtConfig.activationSecret;
        break;
      case TokenType.RECOVERY:
        secret = this.jwtConfig.recoverySecret;
        break;
      default:
        throw new Error('unknown token type');
    }
    return secret;
  }

  public async saveTokens({
    userId,
    accessToken,
    refreshToken,
  }: {
    userId: string;
    accessToken: string;
    refreshToken: string;
  }): Promise<void> {
    await this.tokenModel.updateOne(
      { userId },
      {
        accessToken,
        refreshToken,
        updatedAt: new Date(),
      },
      { upsert: true },
    );
  }

  public async deleteTokens(userId: string): Promise<void> {
    await this.tokenModel.deleteMany({ userId });
  }

  public async isAccessTokenExist(token: string): Promise<boolean> {
    const tokenDoc = await this.tokenModel
      .findOne({ accessToken: token })
      .exec();
    return !!tokenDoc;
  }

  public async isRefreshTokenExist(token: string): Promise<boolean> {
    const tokenDoc = await this.tokenModel
      .findOne({ refreshToken: token })
      .exec();
    return !!tokenDoc;
  }
}
