import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCommentReqDto {
  @ApiProperty({
    example: 'some text',
    description: 'comment of manager',
  })
  @IsString()
  @Length(0, 300)
  @IsNotEmpty()
  body: string;
}
