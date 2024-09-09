import { ApiProperty } from '@nestjs/swagger';

export class OrderResDto {
  @ApiProperty({
    example: '66b90d12fe5abf5ba161ae76',
    description: 'Order ID',
  })
  _id: string;

  @ApiProperty({
    example: 'Anna',
    description: 'Name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'Solan',
    description: 'Surname of the user',
  })
  surname: string;

  @ApiProperty({
    example: 'anna@gmail.com',
    description: 'Email address of the user',
  })
  email: string;

  @ApiProperty({
    example: '+380671234567',
    description: 'Phone number of the user',
  })
  phone: string;

  @ApiProperty({
    example: '25',
    description: 'Age of the user',
  })
  age: number;

  @ApiProperty({
    example: 'FS',
    description: 'Course the user is enrolled in',
  })
  course: string;

  @ApiProperty({
    example: 'static',
    description: 'Format of the course',
  })
  course_format: string;

  @ApiProperty({
    example: 'pro',
    description: 'Type of the course',
  })
  course_type: string;

  @ApiProperty({
    example: '10000',
    description: 'Total sum of the order',
  })
  sum?: number;

  @ApiProperty({
    example: '5000',
    description: 'Amount already paid',
  })
  already_paid?: number;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Date when the order was created',
  })
  created_at?: Date;

  @ApiProperty({
    example: 'some info',
    description: 'Additional information',
  })
  utm?: string;

  @ApiProperty({
    example: 'some info',
    description: 'Additional message',
  })
  msg?: string;

  @ApiProperty({
    example: 'In work',
    description: 'Current status of the order',
  })
  status?: string;

  @ApiProperty({
    example: '66b9e7d601d8019febed8c55',
    description: 'ID of the manager responsible for the order',
  })
  manager: string;

  @ApiProperty({
    example: '605c72ef5f3e4a3d8c3c43e3',
    description: 'ID of the group associated with the order',
  })
  group: string;
}
