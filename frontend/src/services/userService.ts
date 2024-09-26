import { urls } from '../constants';
import { IUser } from '../interfaces';
import { IRes } from '../types';
import { apiService } from './apiService';

const userService = {
  me(): IRes<IUser> {
    return apiService.get(urls.users.me);
  },
  getAll(
    limit: number,
    offset: number,
  ): IRes<{
    data: IUser[];
    meta: { total: number; limit: number; offset: number };
  }> {
    return apiService.get(urls.users.list, {
      params: { limit, offset },
    });
  },
};

export { userService };
