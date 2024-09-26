import { User } from '../../../database/models/user.schema';
import { ActivatedUserResDto } from '../dto/res/activated-user.res.dto';
import { BaseUserResDto } from '../dto/res/base-user.res.dto';
import { RecoveryUserResDto } from '../dto/res/recovery-user.res.dto';

export class UserMapper {
  public static toResponseDTO(user: User): BaseUserResDto {
    return {
      _id: user._id.toString(),
      name: user.name,
      surname: user.surname,
      email: user.email,
      isActive: user.isActive,
      isBanned: user.isBanned,
      role: user.role,
    };
  }
  public static toResponseActivatedDTO(user: User): ActivatedUserResDto {
    return {
      _id: user._id.toString(),
      name: user.name,
      surname: user.surname,
      email: user.email,
      isActive: user.isActive,
      isBanned: user.isBanned,
      role: user.role,
      activationToken: user.activationToken,
    };
  }
  public static toResponseRecoveryADTO(user: User): RecoveryUserResDto {
    return {
      _id: user._id.toString(),
      name: user.name,
      surname: user.surname,
      email: user.email,
      isActive: user.isActive,
      isBanned: user.isBanned,
      role: user.role,
      recoveryToken: user.recoveryToken,
    };
  }
  public static toListResponseDTO(users: User[]): BaseUserResDto[] {
    return users.map(this.toResponseDTO);
  }
}
