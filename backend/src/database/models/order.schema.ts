import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { DocNameEnum } from './enums/document-name.enum';

@Schema({ timestamps: true, versionKey: false })
export class Order extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  course: string;

  @Prop({ required: true })
  course_format: string;

  @Prop({ required: true })
  course_type: string;

  @Prop({ default: null })
  sum?: number;

  @Prop({ default: null })
  already_paid?: number;

  @Prop({ default: Date.now })
  created_at?: Date;

  @Prop({ default: '' })
  utm?: string;

  @Prop({ default: null })
  msg?: string;

  @Prop({ default: null })
  status?: string;

  @Prop({ type: Types.ObjectId, ref: DocNameEnum.USER })
  manager: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: DocNameEnum.GROUP })
  group: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
