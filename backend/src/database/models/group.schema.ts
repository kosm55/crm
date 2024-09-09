import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ versionKey: false })
export class Group extends Document {
  @Prop({ required: true, unique: true })
  group: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
