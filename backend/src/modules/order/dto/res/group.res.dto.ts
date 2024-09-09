import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class GroupResDto {
  @ApiProperty({
    example: '66b90d12fe5abf5ba161ae76',
    description: 'Order ID',
  })
  _id: string;

  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  group: string;
}
