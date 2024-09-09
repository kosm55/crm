import { ApiProperty } from '@nestjs/swagger';

export class CommentResDto {
  @ApiProperty({ example: 'This is a comment', description: 'Comment body' })
  body: string;

  @ApiProperty({
    example: { name: 'Ann', surname: 'Li' },
    description: 'Name of manager',
  })
  user: {
    name: string;
    surname: string;
  };

  @ApiProperty({
    example: '2024-08-24T14:48:00.000Z',
    description: 'Creation date',
  })
  created_at: Date;
}
