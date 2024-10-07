import { urls } from '../constants';
import {
  IAuth,
  ITokens,
  IUser,
  IUserActivate,
  IUserRecovery,
  IUserRegister,
} from '../interfaces';
import { IRes } from '../types';
import { apiService } from './apiService';

const accessTokenKey = 'access';
const refreshTokenKey = 'refresh';

const authService = {
  register(user: IUserRegister): IRes<IUserActivate> {
    return apiService.post(urls.auth.register, user);
  },
  async login(user: IAuth): Promise<IUser> {
    const { data } = await apiService.post(urls.auth.login, user);
    this.setTokens({
      access: data.tokens.accessToken,
      refresh: data.tokens.refreshToken,
    });
    return data.user;
  },
  async refresh(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    const { data } = await apiService.post(
      urls.auth.refresh,
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      },
    );
    const tokens = {
      access: data.accessToken,
      refresh: data.refreshToken,
    };
    this.setTokens(tokens);
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
  async logout(): Promise<void> {
    await apiService.post(urls.auth.logout);
  },
  activateToken(userId: string): IRes<IUserActivate> {
    return apiService.post(urls.auth.activateToken(userId));
  },
  activateManager(token: string, password: string): IRes<IUser> {
    return apiService.post(urls.auth.activateManager(token), { password });
  },
  recoveryToken(userId: string): IRes<IUserRecovery> {
    return apiService.post(urls.auth.recoveryToken(userId));
  },
  recoveryPassword(token: string, password: string): IRes<IUser> {
    return apiService.post(urls.auth.recoveryPassword(token), { password });
  },
};
export { authService };
