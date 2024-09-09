import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { CourseEnum } from '../../modules/order/enums/course.enum';
import { CourseFormatEnum } from '../../modules/order/enums/course-format.enum';
import { CourseTypeEnum } from '../../modules/order/enums/course-type.enum';
import { StatusEnum } from '../../modules/order/enums/status.enum';
import { DocNameEnum } from './enums/document-name.enum';

@Schema({ timestamps: true, versionKey: false })
export class Order extends Document {
  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  surname: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  phone: string | null;

  @Prop({ required: false })
  age: number | null;

  @Prop({
    default: null,
    required: false,
    validate: {
      validator: function (value) {
        return (
          value === null ||
          value === '' ||
          Object.values(CourseEnum).includes(value)
        );
      },
      message: (props) =>
        `${props.value} is not a valid enum value for path ${props.path}`,
    },
  })
  course?: CourseEnum | null;

  @Prop({
    default: null,
    required: false,
    validate: {
      validator: function (value) {
        return (
          value === null ||
          value === '' ||
          Object.values(CourseFormatEnum).includes(value)
        );
      },
      message: (props) =>
        `${props.value} is not a valid enum value for path ${props.path}`,
    },
  })
  course_format?: CourseFormatEnum | null;

  @Prop({
    default: null,
    required: false,
    validate: {
      validator: function (value) {
        return (
          value === null ||
          value === '' ||
          Object.values(CourseTypeEnum).includes(value)
        );
      },
      message: (props) =>
        `${props.value} is not a valid enum value for path ${props.path}`,
    },
  })
  course_type?: CourseTypeEnum | null;

  @Prop({ default: null })
  sum?: number;

  @Prop({ default: null })
  already_paid?: number;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: null })
  utm?: string;

  @Prop({ default: null })
  msg?: string;

  @Prop({ default: null, enum: StatusEnum })
  status?: StatusEnum;

  @Prop({ type: Types.ObjectId, ref: DocNameEnum.USER })
  manager: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: DocNameEnum.GROUP })
  group: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: DocNameEnum.COMMENT }] })
  comments: Types.ObjectId[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
