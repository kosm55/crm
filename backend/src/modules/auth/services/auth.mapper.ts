import { User } from '../../../database/models/user.schema';
import { UserMapper } from '../../user/services/user.mapper';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { TokenPairResDto } from '../dto/res/token-pair.res.dto';
import { ITokenPair } from '../interfases/token-pair.interface';
import { IUserData } from '../interfases/user-data.interface';

export class AuthMapper {
  public static toResponseDTO(user: User, tokenPair: ITokenPair): AuthResDto {
    return {
      tokens: this.toResponseTokensDTO(tokenPair),
      user: UserMapper.toResponseDTO(user),
    };
  }

  public static toResponseTokensDTO(tokenPair: ITokenPair): TokenPairResDto {
    return {
      accessToken: tokenPair.accessToken,
      refreshToken: tokenPair.refreshToken,
    };
  }

  public static toUserDataDTO(user: User): IUserData {
    return {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };
  }
}
