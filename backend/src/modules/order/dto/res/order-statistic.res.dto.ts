import { ApiProperty } from '@nestjs/swagger';

export class OrderStatisticDto {
  @ApiProperty({
    example: 'NEW',
    description: 'Status of the order',
  })
  status: string;

  @ApiProperty({
    example: 10,
    description: 'Count of orders with this status',
  })
  count: number;
}

export class OrdersStatisticsResDto {
  @ApiProperty({
    type: [OrderStatisticDto],
    description: 'List of order statuses and their counts',
  })
  statistic: OrderStatisticDto[];

  @ApiProperty({
    example: 100,
    description: 'Total number of orders',
  })
  totalCount: number;
}
