import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Order, OrderSchema } from '../../database/models/order.schema';
import { UserModule } from '../user/user.module';
import { OrderController } from './order.controller';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
