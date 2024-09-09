import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';
import { Types } from 'mongoose';

export class OrderReqDto {
  _id: Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  surname: string;

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsOptional()
  age: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.course !== '')
  course: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.course_format !== '')
  course_format: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.course_type !== '')
  course_type: string;

  @ApiProperty()
  @IsOptional()
  sum?: number;

  @ApiProperty()
  @IsOptional()
  already_paid?: number;

  @ApiProperty()
  @IsOptional()
  created_at?: Date;

  @ApiProperty()
  @IsOptional()
  utm?: string;

  @ApiProperty()
  @IsOptional()
  msg?: string;

  @ApiProperty()
  @IsOptional()
  status?: string;

  @ApiProperty()
  @IsOptional()
  manager?: Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  group?: Types.ObjectId;

  @ApiProperty()
  @IsOptional()
  comments?: Types.ObjectId[];
}
