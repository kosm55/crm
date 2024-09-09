import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { Group } from '../../database/models/group.schema';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { RoleEnum } from '../auth/enums/role.enum';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { IUserData } from '../auth/interfases/user-data.interface';
import { CreateCommentReqDto } from './dto/req/create-comment.req.dto';
import { CreateGroupReqDto } from './dto/req/create-group.req.dto';
import { OrderListReqDto } from './dto/req/order-list.req.dto';
import { UpdateOrderReqDto } from './dto/req/update-order.req.dto';
import { GroupResDto } from './dto/res/group.res.dto';
import { OrderResDto } from './dto/res/order.res.dto';
import { OrderListResDto } from './dto/res/order-list.res.dto';
import { CourseEnum } from './enums/course.enum';
import { CourseFormatEnum } from './enums/course-format.enum';
import { CourseTypeEnum } from './enums/course-type.enum';
import { StatusEnum } from './enums/status.enum';
import { OrderService } from './services/order.service';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
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
  @ApiQuery({
    name: 'course',
    required: false,
    enum: CourseEnum,
    description: 'Course to filter',
  })
  @ApiQuery({
    name: 'course_format',
    required: false,
    enum: CourseFormatEnum,
    description: 'Course format to filter',
  })
  @ApiQuery({
    name: 'course_type',
    required: false,
    enum: CourseTypeEnum,
    description: 'Course type to filter',
  })
  @ApiQuery({
    name: 'group ID',
    required: false,
    type: String,
    description: 'Group to filter',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: StatusEnum,
    description: 'Status to filter',
  })
  @ApiQuery({
    name: 'userOnly',
    required: false,
    type: Boolean,
    description: ' show only the user`s own orders',
  })
  @Get()
  @ApiOperation({ summary: 'get list of orders' })
  public async getList(
    @CurrentUser() userData: IUserData,
    @Query() query: OrderListReqDto,
  ): Promise<OrderListResDto> {
    return await this.orderService.getList(query, userData);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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
  @ApiQuery({
    name: 'course',
    required: false,
    enum: CourseEnum,
    description: 'Course to filter',
  })
  @ApiQuery({
    name: 'course_format',
    required: false,
    enum: CourseFormatEnum,
    description: 'Course format to filter',
  })
  @ApiQuery({
    name: 'course_type',
    required: false,
    enum: CourseTypeEnum,
    description: 'Course type to filter',
  })
  @ApiQuery({
    name: 'group ID',
    required: false,
    type: String,
    description: 'Group to filter',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: StatusEnum,
    description: 'Status to filter',
  })
  @ApiQuery({
    name: 'userOnly',
    required: false,
    type: Boolean,
    description: ' show only the user`s own orders',
  })
  @Get('export-to-excel')
  @ApiOperation({ summary: 'Export orders to excel' })
  public async exportToExcel(
    @CurrentUser() userData: IUserData,
    @Query() query: OrderListReqDto,
    @Res() res: Response,
  ): Promise<void> {
    return await this.orderService.exportToExcel(query, userData, res);
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get('statistic')
  async getOrdersStatistics(): Promise<any> {
    return await this.orderService.getOrdersStatistic();
  }

  @SkipAuth()
  @Get('group')
  @ApiOperation({ summary: 'get list of group' })
  public async getListGroup(): Promise<Group[]> {
    return await this.orderService.getListGroup();
  }

  @SkipAuth()
  @ApiOperation({ summary: 'get list of status' })
  @Get('status')
  getListStatuses() {
    return [
      StatusEnum.NEW,
      StatusEnum.IN_WORK,
      StatusEnum.AGREE,
      StatusEnum.DISAGREE,
      StatusEnum.DUBBING,
    ];
  }

  @SkipAuth()
  @ApiOperation({ summary: 'get list of courses type' })
  @Get('course-type')
  getListCourseType() {
    return [
      CourseTypeEnum.PRO,
      CourseTypeEnum.PREMIUM,
      CourseTypeEnum.VIP,
      CourseTypeEnum.MINIMAL,
      CourseTypeEnum.INCUBATOR,
    ];
  }

  @SkipAuth()
  @ApiOperation({ summary: 'get list of courses format' })
  @Get('course-format')
  getListCourseFormat() {
    return [CourseFormatEnum.STATIC, CourseFormatEnum.ONLINE];
  }

  @SkipAuth()
  @ApiOperation({ summary: 'get list of courses' })
  @Get('courses')
  getListCourses() {
    return [
      CourseEnum.FE,
      CourseEnum.FS,
      CourseEnum.JCX,
      CourseEnum.PCX,
      CourseEnum.QACX,
      CourseEnum.JSCX,
    ];
  }

  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get('/:managerId/statistic')
  async getManagerOrdersStatistic(
    @Param('managerId') managerId: string,
  ): Promise<any> {
    return await this.orderService.getManagerOrdersStatistic(managerId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get(':orderId')
  @ApiOperation({ summary: 'Get order by ID' })
  public async getById(@Param('orderId') orderId: string): Promise<any> {
    return await this.orderService.getById(orderId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
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

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('group')
  @ApiOperation({ summary: 'create group' })
  public async create(@Body() dto: CreateGroupReqDto): Promise<GroupResDto> {
    return await this.orderService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post(':orderId/comments')
  public async addComment(
    @CurrentUser() userData: IUserData,
    @Param('orderId') orderId: string,
    @Body() dto: CreateCommentReqDto,
  ): Promise<any> {
    return await this.orderService.addComment(userData, orderId, dto);
  }
}
