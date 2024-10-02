import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class OrderListReqDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 25;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  offset?: number = 0;

  @IsOptional()
  @IsString()
  sortField?: string;

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsOptional()
  @IsString()
  name?: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsOptional()
  @IsString()
  surname?: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsOptional()
  @IsString()
  email?: string;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  course?: string;

  @IsOptional()
  @IsString()
  course_format?: string;

  @IsOptional()
  @IsString()
  course_type?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  group?: string;

  @Transform(TransformHelper.toBoolean)
  @IsOptional()
  @IsBoolean()
  userOnly?: boolean;
}
