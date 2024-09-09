import { BaseUserResDto } from './base-user.res.dto';

export class UserListResDto {
  data: BaseUserResDto[];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}
