import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfases/user-data.interface';
import { OrderListReqDto } from './dto/req/order-list.req.dto';
import { UpdateOrderReqDto } from './dto/req/update-order.req.dto';
import { OrderResDto } from './dto/res/order.res.dto';
import { OrderListResDto } from './dto/res/order-list.res.dto';
import { OrderService } from './services/order.service';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Offset from the start',
  })
  @ApiQuery({
    name: 'sortField',
    required: false,
    type: String,
    description: 'Field to sort by',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: String,
    enum: ['asc', 'desc'],
    description: 'Sort order',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Name to filter',
  })
  @ApiQuery({
    name: 'surname',
    required: false,
    type: String,
    description: 'Surname to filter',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    type: String,
    description: 'Email to filter',
  })
  @ApiQuery({
    name: 'phone',
    required: false,
    type: String,
    description: 'Phone number to filter',
  })
  @ApiQuery({
    name: 'age',
    required: false,
    type: Number,
    description: 'Age to filter',
  })
  @Get()
  @ApiOperation({ summary: 'get list of orders' })
  public async getList(
    @Query() query: OrderListReqDto,
  ): Promise<OrderListResDto> {
    return await this.orderService.getList(query);
  }

  @ApiBearerAuth()
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Put(':orderId')
  @ApiOperation({ summary: 'update order' })
  public async updateById(
    @CurrentUser() userData: IUserData,
    @Param('orderId') orderId: string,
    @Body() dto: UpdateOrderReqDto,
  ): Promise<OrderResDto> {
    return await this.orderService.updateById(userData, orderId, dto);
  }
}
