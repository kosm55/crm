import { PartialType } from '@nestjs/swagger';

import { OrderListReqDto } from './req/order-list.req.dto';

export class UpdateOrderDto extends PartialType(OrderListReqDto) {}
