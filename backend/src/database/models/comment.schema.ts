import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { DocNameEnum } from './enums/document-name.enum';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true, versionKey: false })
export class Comment extends Document {
  @Prop({ type: Types.ObjectId, ref: DocNameEnum.ORDER, required: true })
  orderId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: DocNameEnum.USER, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  body: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
