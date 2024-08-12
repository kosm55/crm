import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { regexConstant } from '../../../../constants/regex.constant';

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
  name: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({
    example: 'Set',
    description: 'surname',
  })
  surname: string;

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
  email: string;

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
  phone: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 25,
    description: 'age',
  })
  age: number;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'JSCX',
    description: 'course',
  })
  course: string;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'static',
    description: 'course format',
  })
  course_format: string;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'minimal',
    description: 'course type',
  })
  course_type: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 15000,
    description: 'sum',
  })
  sum: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 1000,
    description: 'already paid',
  })
  already_paid: number;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    example: '2021-11-02T14:45:02Z',
    description: 'created_at',
  })
  created_at?: Date;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'target_main_target_fullstack_target_js',
    description: 'some info',
  })
  utm?: string;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'some info',
    description: 'some info',
  })
  msg?: string;

  @IsOptional()
  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'In work',
    description: 'status',
  })
  status?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '66b90d12fe5abf5ba161ae76',
    description: 'manager id',
  })
  manager?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '66b90d12fe5abf5ba161ae76',
    description: 'group id',
  })
  group?: string;
}
