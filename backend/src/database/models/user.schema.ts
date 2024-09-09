import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { RoleEnum } from '../../modules/auth/enums/role.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ enum: [RoleEnum.ADMIN, RoleEnum.MANAGER], default: RoleEnum.MANAGER })
  role: RoleEnum;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: false })
  isBanned: boolean;

  @Prop({ default: null })
  activationToken: string;

  @Prop({ default: null })
  recoveryToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
