import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../../../database/models/order.schema';
import { IUserData } from '../../auth/interfases/user-data.interface';
import { OrderListReqDto } from '../dto/req/order-list.req.dto';
import { UpdateOrderReqDto } from '../dto/req/update-order.req.dto';
import { OrderResDto } from '../dto/res/order.res.dto';
import { OrderListResDto } from '../dto/res/order-list.res.dto';
import { OrderMapper } from './order.mapper';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}

  async getList(query: OrderListReqDto): Promise<OrderListResDto> {
    const {
      limit = 25,
      offset = 0,
      sortField = 'created_at',
      sortOrder = 'desc',
      name,
      surname,
      email,
      phone,
      age,
    } = query;

    const filter: Partial<Record<keyof Order, any>> = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    if (surname) {
      filter.surname = { $regex: surname, $options: 'i' };
    }
    if (email) {
      filter.email = { $regex: email, $options: 'i' };
    }
    if (phone) {
      filter.phone = { $regex: phone, $options: 'i' };
    }
    if (age) {
      filter.age = age;
    }

    const sort: { [key: string]: 1 | -1 } = sortField
      ? { [sortField]: sortOrder === 'asc' ? 1 : -1 }
      : { createdAt: -1 };

    const data = await this.orderModel
      .find(filter)
      .sort(sort)
      .skip(offset)
      .limit(limit)
      .exec();

    const total = await this.orderModel.countDocuments(filter).exec();

    return {
      data,
      meta: {
        total,
        limit,
        offset,
      },
    };
  }

  public async updateById(
    userData: IUserData,
    orderId: string,
    dto: UpdateOrderReqDto,
  ): Promise<OrderResDto> {
    const order = await this.orderModel
      .findByIdAndUpdate(orderId, dto, {
        new: true,
      })
      .exec();

    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    return OrderMapper.toResponseDTO(order);
  }
}
