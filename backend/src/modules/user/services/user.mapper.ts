import { User } from '../../../database/models/user.schema';
import { BaseUserResDto } from '../dto/res/base-user.res.dto';
import { UserListResDto } from '../dto/res/user-list.res.dto';

export class UserMapper {
  public static toResponseDTO(user: User): BaseUserResDto {
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }
  public static toListResponseDTO(entities: User[]): UserListResDto {
    return {
      data: entities.map(this.toResponseDTO),
    };
  }
}
