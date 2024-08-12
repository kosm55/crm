import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../../../database/models/user.schema';
import { RoleEnum } from '../../auth/enums/role.enum';
import { IUserData } from '../../auth/interfases/user-data.interface';
import { BaseUserResDto } from '../dto/res/base-user.res.dto';
import { UserListResDto } from '../dto/res/user-list.res.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}
  async createUser(createUserDto: any): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }
  async getMe(userData: IUserData): Promise<BaseUserResDto> {
    const user = await this.userModel.findById(userData.userId).exec();
    if (!user) {
      throw new NotFoundException(`User ${userData.userId} not found`);
    }
    return UserMapper.toResponseDTO(user);
  }
  async getList(): Promise<UserListResDto> {
    const managers = await this.userModel
      .find({ role: RoleEnum.MANAGER })
      .exec();
    return UserMapper.toListResponseDTO(managers);
  }

  public async isEmailUniqueOrThrow(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new ConflictException('email is already taken');
    }
  }
  public async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).select('+password').exec();
  }

  public async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
