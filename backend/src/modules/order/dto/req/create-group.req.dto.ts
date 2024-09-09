import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class CreateGroupReqDto {
  @ApiProperty({
    example: 'sep2024',
    description: 'name of group',
  })
  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  group: string;
}
