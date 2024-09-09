import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Types } from 'mongoose';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { regexConstant } from '../../../../constants/regex.constant';
import { CourseEnum } from '../../enums/course.enum';
import { CourseFormatEnum } from '../../enums/course-format.enum';
import { CourseTypeEnum } from '../../enums/course-type.enum';
import { StatusEnum } from '../../enums/status.enum';

export class UpdateOrderReqDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({
    example: 'Nikolas',
    description: 'name',
  })
  name?: string | null;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({
    example: 'Set',
    description: 'surname',
  })
  surname?: string | null;

  @IsOptional()
  @Matches(regexConstant.EMAIL, {
    message: 'Invalid email',
  })
  @IsString()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @ApiProperty({
    example: 'nikolas@gmail.com',
    description: 'email',
  })
  email?: string | null;

  @IsOptional()
  @Matches(regexConstant.PHONE, {
    message: 'Invalid phone',
  })
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: '380671234567',
    description: 'phone',
  })
  phone?: string | null;

  @IsOptional()
  @IsNumber()
  @Min(6)
  @Max(120)
  @ApiProperty({
    example: 25,
    description: 'age',
  })
  age?: number | null;

  @IsOptional()
  @IsEnum(CourseEnum)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'JSCX',
    description: 'course',
    enum: CourseEnum,
  })
  course?: CourseEnum | null;

  @IsOptional()
  @IsEnum(CourseFormatEnum)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'static',
    description: 'course format',
    enum: CourseFormatEnum,
  })
  course_format?: CourseFormatEnum | null;

  @IsOptional()
  @IsEnum(CourseTypeEnum)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'minimal',
    description: 'course type',
    enum: CourseTypeEnum,
  })
  course_type?: CourseTypeEnum | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 15000,
    description: 'sum',
  })
  sum?: number | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 1000,
    description: 'already paid',
  })
  already_paid?: number | null;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'target_main_target_fullstack_target_js',
    description: 'some info',
  })
  utm?: string | null;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'some info',
    description: 'some info',
  })
  msg?: string | null;

  @IsOptional()
  @IsEnum(StatusEnum)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'In work',
    description: 'status',
    enum: StatusEnum,
  })
  status?: StatusEnum | null;

  @IsOptional()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : null))
  @ApiProperty({
    example: '66b90d12fe5abf5ba161ae76',
    description: 'group id',
  })
  group?: Types.ObjectId | null;
}
