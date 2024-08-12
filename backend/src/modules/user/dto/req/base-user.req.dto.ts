import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { regexConstant } from '../../../../constants/regex.constant';

export class BaseUserReqDto {
  @IsOptional()
  @IsString()
  @Length(3, 20)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({
    example: 'Anna',
    description: 'The name of user',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @ApiProperty({
    example: 'Lin',
    description: 'The surname of user',
  })
  surname?: string;

  @Matches(regexConstant.EMAIL, {
    message: 'invalid email',
  })
  @IsString()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'The email of user',
  })
  email: string;

  @IsString()
  @Matches(regexConstant.PASSWORD, {
    message:
      'invalid password, min 8 characters, min: 1 uppercase letter, 1 lowercase letter, 1 digit',
  })
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: '12@xcadAXf',
    description: 'The password of user',
  })
  password: string;
}
