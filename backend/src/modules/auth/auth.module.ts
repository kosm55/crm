import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';

import { Order, OrderSchema } from '../../database/models/order.schema';
import { Token, TokenSchema } from '../../database/models/tokens.schema';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    JwtModule,
    // JwtModule.register({
    //   secret: process.env.JWT_ACCESS_SECRET,
    //   signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN },
    // }),
    UserModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtRefreshGuard,
  ],
  exports: [JwtModule, TokenService],
})
export class AuthModule {}
