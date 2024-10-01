import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Workbook } from 'exceljs';
import { Response } from 'express';
import { Model, Types } from 'mongoose';

import { DocNameEnum } from '../../../database/models/enums/document-name.enum';
import { Group } from '../../../database/models/group.schema';
import { Order } from '../../../database/models/order.schema';
import { User } from '../../../database/models/user.schema';
import { IUserData } from '../../auth/interfases/user-data.interface';
import { CreateCommentReqDto } from '../dto/req/create-comment.req.dto';
import { CreateGroupReqDto } from '../dto/req/create-group.req.dto';
import { OrderListReqDto } from '../dto/req/order-list.req.dto';
import { UpdateOrderReqDto } from '../dto/req/update-order.req.dto';
import { GroupResDto } from '../dto/res/group.res.dto';
import { OrderResDto } from '../dto/res/order.res.dto';
import { OrderListResDto } from '../dto/res/order-list.res.dto';
import { StatusEnum } from '../enums/status.enum';
import { IOrderStatistic } from '../interfaces/order-statistic.interface';
import { OrderMapper } from './order.mapper';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(DocNameEnum.ORDER) private readonly orderModel: Model<Order>,
    @InjectModel(DocNameEnum.GROUP) private readonly groupModel: Model<Group>,
    @InjectModel(DocNameEnum.USER) private readonly userModel: Model<User>,
    @InjectModel(DocNameEnum.COMMENT)
    private readonly commentModel: Model<Comment>,
  ) {}

  public async getList(
    query: OrderListReqDto,
    userData: IUserData,
  ): Promise<OrderListResDto> {
    const {
      limit = 25,
      offset = 0,
      sortField = 'created_at',
      sortOrder = 'desc',
    } = query;

    const filter = this.createFilter(query, userData);

    const sort: { [key: string]: 1 | -1 } = sortField
      ? { [sortField]: sortOrder === 'asc' ? 1 : -1 }
      : { createdAt: -1 };

    const data = await this.orderModel
      .aggregate([
        { $match: filter },

        {
          $lookup: {
            from: 'users',
            localField: 'manager',
            foreignField: '_id',
            as: 'managerDetails',
          },
        },
        {
          $unwind: {
            path: '$managerDetails',
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: 'groups',
            localField: 'group',
            foreignField: '_id',
            as: 'groupDetails',
          },
        },
        {
          $unwind: {
            path: '$groupDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        { $sort: sort },
        {
          $project: {
            _id: 1,
            name: 1,
            surname: 1,
            email: 1,
            phone: 1,
            age: 1,
            course: 1,
            course_format: 1,
            course_type: 1,
            sum: 1,
            already_paid: 1,
            created_at: 1,
            utm: 1,
            msg: 1,
            status: 1,
            updatedAt: 1,
            group: 1,
            manager: 1,

            // manager: {
            //   name: '$managerDetails.name',
            //   surname: '$managerDetails.surname',
            // },
          },
        },
      ])
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

  public async exportToExcel(
    query: OrderListReqDto,
    userData: IUserData,
    res: Response,
  ): Promise<void> {
    const filter = this.createFilter(query, userData);

    const orders = await this.orderModel.find(filter).exec();
    const groups = await this.groupModel.find().exec();
    const managers = await this.userModel.find().exec();

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Surname', key: 'surname', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone', key: 'phone', width: 20 },
      { header: 'Age', key: 'age', width: 10 },
      { header: 'Course', key: 'course', width: 20 },
      { header: 'Course Format', key: 'course_format', width: 20 },
      { header: 'Course Type', key: 'course_type', width: 20 },
      { header: 'Sum', key: 'sum', width: 15 },
      { header: 'Already Paid', key: 'already_paid', width: 15 },
      { header: 'Status', key: 'status', width: 20 },
      { header: 'Group', key: 'group', width: 20 },
      { header: 'Manager', key: 'manager', width: 30 },
    ];
    orders.forEach((order: Order) => {
      let groupName = '';
      let managerName = '';
      if (order.group) {
        for (const item of groups) {
          if (item._id.toString() === order.group.toString()) {
            groupName = item.group;
            break;
          }
        }
      }
      if (order.manager) {
        for (const item of managers) {
          if (item._id.toString() === order.manager.toString()) {
            managerName = item.name;
            break;
          }
        }
      }
      worksheet.addRow({
        name: order.name,
        surname: order.surname,
        email: order.email,
        phone: order.phone,
        age: order.age,
        course: order.course,
        course_format: order.course_format,
        course_type: order.course_type,
        sum: order.sum,
        already_paid: order.already_paid,
        status: order.status,
        group: groupName,
        manager: managerName,
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }

  public async getById(orderId: string): Promise<any> {
    if (!Types.ObjectId.isValid(orderId)) {
      throw new BadRequestException(`Invalid order ID ${orderId}`);
    }
    const orderExist: Order = await this.orderModel.findById(orderId).exec();
    if (!orderExist) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }
    const order = await this.orderModel
      .aggregate([
        { $match: { _id: new Types.ObjectId(orderId) } },

        {
          $lookup: {
            from: 'comments',
            localField: 'comments',
            foreignField: '_id',
            as: 'comments',
          },
        },

        {
          $lookup: {
            from: 'users',
            localField: 'comments.userId',
            foreignField: '_id',
            as: 'commentUsers',
          },
        },

        {
          $unwind: {
            path: '$comments',
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $lookup: {
            from: 'users',
            localField: 'comments.userId',
            foreignField: '_id',
            as: 'comments.user',
          },
        },

        {
          $unwind: {
            path: '$comments.user',
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            surname: { $first: '$surname' },
            email: { $first: '$email' },
            phone: { $first: '$phone' },
            age: { $first: '$age' },
            course: { $first: '$course' },
            course_format: { $first: '$course_format' },
            course_type: { $first: '$course_type' },
            sum: { $first: '$sum' },
            already_paid: { $first: '$already_paid' },
            created_at: { $first: '$created_at' },
            utm: { $first: '$utm' },
            msg: { $first: '$msg' },
            status: { $first: '$status' },
            group: { $first: '$group' },
            manager: { $first: '$manager' },
            updatedAt: { $first: '$updatedAt' },
            comments: {
              $push: {
                _id: '$comments._id',
                body: '$comments.body',
                created_at: '$comments.created_at',
                user: {
                  name: '$comments.user.name',
                  surname: '$comments.user.surname',
                },
              },
            },
          },
        },
      ])
      .exec();

    if (!order || order.length === 0) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    return order[0];
  }
  public async updateById(
    userData: IUserData,
    orderId: string,
    dto: UpdateOrderReqDto,
  ): Promise<OrderResDto> {
    const order: Order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }
    if (order.manager && order.manager.toString() !== userData.userId) {
      throw new ConflictException('You cannot update this order');
    }
    if (!order.manager) {
      order.manager = new Types.ObjectId(userData.userId);
      order.status =
        order.status === null || order.status === StatusEnum.NEW
          ? StatusEnum.IN_WORK
          : order.status;

      await order.save();
    }

    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(
        orderId,
        { ...dto, group: dto.group ? new Types.ObjectId(dto.group) : null },
        {
          new: true,
        },
      )
      .exec();
    return OrderMapper.toResponseDTO(updatedOrder);
  }

  public async create(dto: CreateGroupReqDto): Promise<GroupResDto> {
    const group = await this.groupModel.findOne({ group: dto.group });
    if (group) {
      throw new ConflictException('group already exist');
    }
    const newGroup = new this.groupModel({ group: dto.group });
    const saveGroup = await newGroup.save();
    return OrderMapper.toResponseGroupDTO(saveGroup);
  }

  public async getListGroup(): Promise<Group[]> {
    return await this.groupModel.find().exec();
  }

  public async getOrdersStatistic(): Promise<any> {
    const statistic = await this.orderModel.aggregate<IOrderStatistic>([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          status: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);
    const totalCount = await this.orderModel.countDocuments();

    return {
      statistic,
      totalCount,
    };
  }

  public async getManagerOrdersStatistic(managerId: string): Promise<{
    statistic: Array<IOrderStatistic> | number;
    totalCount: Array<IOrderStatistic> | number;
  }> {
    const [managerStatistic, totalCount] = await Promise.all([
      this.orderModel.aggregate<IOrderStatistic>([
        {
          $match: { manager: new Types.ObjectId(managerId) },
        },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            status: '$_id',
            count: 1,
            _id: 0,
          },
        },
      ]),
      this.orderModel.countDocuments({
        manager: new Types.ObjectId(managerId),
      }),
    ]);

    return {
      statistic: managerStatistic,
      totalCount,
    };
  }

  public async addComment(
    userData: IUserData,
    orderId: string,
    dto: CreateCommentReqDto,
  ): Promise<Order> {
    const order: Order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    if (order.manager && order.manager.toString() !== userData.userId) {
      throw new ConflictException('You cannot comment on this order');
    }

    const newComment = new this.commentModel({
      orderId: order._id,
      userId: new Types.ObjectId(userData.userId),
      body: dto.body,
    });

    await newComment.save();

    order.comments.push(newComment._id);
    if (!order.manager || order.manager.toString() === userData.userId) {
      order.manager = new Types.ObjectId(userData.userId);
      order.status =
        order.status === null || order.status === StatusEnum.NEW
          ? StatusEnum.IN_WORK
          : order.status;

      await order.save();
    }
    return await this.orderModel.findById(orderId).exec();
  }

  private createFilter(
    query: OrderListReqDto,
    userData: IUserData,
  ): Partial<Record<keyof Order, any>> {
    const filter: Partial<Record<keyof Order, any>> = {};

    const {
      name,
      surname,
      email,
      phone,
      age,
      course,
      course_format,
      course_type,
      status,
      group,
      userOnly,
    } = query;

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
    if (course) {
      filter.course = { $regex: course, $options: 'i' };
    }
    if (course_format) {
      filter.course_format = { $regex: course_format, $options: 'i' };
    }
    if (course_type) {
      filter.course_type = { $regex: course_type, $options: 'i' };
    }
    if (status) {
      filter.status = { $regex: status, $options: 'i' };
    }
    if (group) {
      if (Types.ObjectId.isValid(group)) {
        filter.group = new Types.ObjectId(group);
      } else {
        throw new BadRequestException('Invalid group ID');
      }
    }
    if (userOnly && userData.userId) {
      filter.manager = new Types.ObjectId(userData.userId);
    }

    return filter;
  }
}
