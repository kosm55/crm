import { Order } from '../../../database/models/order.schema';
import { OrderResDto } from '../dto/res/order.res.dto';

export class OrderMapper {
  public static toResponseDTO(order: Order): OrderResDto {
    return {
      _id: order.id,
      name: order.name,
      surname: order.surname,
      email: order.email,
      phone: order.phone,
      age: order.age,
      course: order.course,
      course_format: order.course_format,
      course_type: order.course_type,
      sum: order.sum,
      already_paid: order.already_paid,
      created_at: order.created_at,
      utm: order.utm,
      msg: order.msg,
      status: order.status,
      manager: order.manager ? order.manager.toString() : null,
      group: order.group ? order.group.toString() : null,
    };
  }
}
