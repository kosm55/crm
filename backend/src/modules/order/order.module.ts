import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Order, OrderSchema } from '../../database/models/order.schema';
import { Token, TokenSchema } from '../../database/models/tokens.schema';
import { AuthModule } from '../auth/auth.module';
import { TokenService } from '../auth/services/token.service';
import { UserModule } from '../user/user.module';
import { OrderController } from './order.controller';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, TokenService],
})
export class OrderModule {}
