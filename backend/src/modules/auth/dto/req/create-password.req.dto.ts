import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { regexConstant } from '../../../../constants/regex.constant';

export class CreatePasswordReqDto {
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
