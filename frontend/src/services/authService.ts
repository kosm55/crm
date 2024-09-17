import { urls } from '../constants';
import { IActivateUser, IAuth, ITokens, IUser } from '../interfaces';
import { IRes } from '../types';
import { apiService } from './apiService';

const accessTokenKey = 'access';
const refreshTokenKey = 'refresh';

const authService = {
  register(user: IAuth): IRes<IActivateUser> {
    return apiService.post(urls.auth.register, user);
  },
  me(): IRes<IUser> {
    return apiService.get(urls.users.me);
  },
  setTokens({ access, refresh }: ITokens): void {
    localStorage.setItem(accessTokenKey, access);
    localStorage.setItem(refreshTokenKey, refresh);
  },
  getAccessToken(): string {
    return localStorage.getItem(accessTokenKey);
  },
  getRefreshToken(): string {
    return localStorage.getItem(refreshTokenKey);
  },
  deleteTokens(): void {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
  },
};
export { authService };
