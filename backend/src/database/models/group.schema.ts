import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true, versionKey: false })
export class Group extends Document {
  @Prop({ required: true })
  group: string;
}

export const UserSchema = SchemaFactory.createForClass(Group);
