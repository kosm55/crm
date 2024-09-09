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
import { UserListReqDto } from '../dto/req/user-list.req.dto';
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
  public async updateUser(userId: string, dto: Partial<User>): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(userId, dto, {
        new: true,
      })
      .exec();
  }

  public async updateUserPassword(
    userId: string,
    password: string,
  ): Promise<void> {
    const user: User = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userModel.updateOne({ _id: userId }, { password }).exec();
  }
  public async banUser(userId: string): Promise<string> {
    const user: User = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isBanned) {
      throw new ConflictException('User is already baned');
    }

    await this.userModel.updateOne({ _id: userId }, { isBanned: true }).exec();
    return `user ${user.name} successfully banned`;
  }

  public async unbanUser(userId: string): Promise<any> {
    const user: User = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isBanned) {
      throw new ConflictException('User is not baned');
    }

    await this.userModel.updateOne({ _id: userId }, { isBanned: false }).exec();

    // const unbannedUser = await this.userModel.findById(userId).exec();
    // return UserMapper.toResponseDTO(unbannedUser);
    return `user ${user.name} successfully unbanned`;
  }

  public async activateUser(userId: string): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { isActive: true }).exec();
  }

  public async getMe(userData: IUserData): Promise<BaseUserResDto> {
    const user = await this.userModel.findById(userData.userId).exec();
    if (!user) {
      throw new NotFoundException(`User ${userData.userId} not found`);
    }
    return UserMapper.toResponseDTO(user);
  }
  public async getList(query: UserListReqDto): Promise<UserListResDto> {
    const { limit = 10, offset = 0 } = query;
    const total = await this.userModel
      .countDocuments({
        role: RoleEnum.MANAGER,
      })
      .exec();

    const managers = await this.userModel
      .find({ role: RoleEnum.MANAGER })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();

    return {
      data: UserMapper.toListResponseDTO(managers),
      meta: {
        total,
        limit,
        offset,
      },
    };
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
  public async deleteActivationToken(userId: string): Promise<void> {
    await this.userModel
      .updateOne({ _id: userId }, { activationToken: null })
      .exec();
  }

  public async deleteRecoveryToken(userId: string): Promise<void> {
    await this.userModel
      .updateOne({ _id: userId }, { recoveryToken: null })
      .exec();
  }
}
