import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Comment, CommentSchema } from '../../database/models/comment.schema';
import { Group, GroupSchema } from '../../database/models/group.schema';
import { Order, OrderSchema } from '../../database/models/order.schema';
import { Token, TokenSchema } from '../../database/models/tokens.schema';
import { User, UserSchema } from '../../database/models/user.schema';
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
      { name: Comment.name, schema: CommentSchema },
      { name: Group.name, schema: GroupSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, TokenService],
})
export class OrderModule {}
