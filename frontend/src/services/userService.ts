import { urls } from '../constants';
import { IUser } from '../interfaces';
import { IRes } from '../types';
import { apiService } from './apiService';

const userService = {
  me(): IRes<IUser> {
    return apiService.get(urls.users.me);
  },
  getById(userId: string): IRes<IUser> {
    return apiService.get(urls.users.byId(userId));
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
  ban(userId: string): IRes<string> {
    return apiService.patch(urls.users.ban(userId));
  },
  unban(userId: string): IRes<string> {
    return apiService.patch(urls.users.unBan(userId));
  },
};

export { userService };
