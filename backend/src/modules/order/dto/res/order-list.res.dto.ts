import { Order } from '../../../../database/models/order.schema';

export class OrderListResDto {
  data: Order[];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}
