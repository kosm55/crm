import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { regexConstant } from '../../../../constants/regex.constant';

export class CreateUserReqDto {
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
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'Erika',
    description: 'The name of user',
  })
  name: string;

  @IsString()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    example: 'Rik',
    description: 'The surname of user',
  })
  surname: string;
}
