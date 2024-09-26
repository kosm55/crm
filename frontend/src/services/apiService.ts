import axios, { AxiosError } from 'axios';

import { baseURL, urls } from '../constants';
import { router } from '../router';
import { authService } from './authService';

let isRefreshing = false;
type IWaitList = () => void;
const waitList: IWaitList[] = [];
const apiService = axios.create({ baseURL: baseURL });

apiService.interceptors.request.use((req) => {
  if (req.url === '/auth/refresh') {
    const refreshToken = authService.getRefreshToken();
    if (refreshToken) {
      req.headers['Authorization'] = `Bearer ${refreshToken}`;
    }
  } else {
    const accessToken = authService.getAccessToken();
    if (accessToken) {
      req.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }
  // це якась лажа , уточнить як можна додати рефреш замість аксес токену в хедер
  // і чому y мене не передається без запиту на урлу хоча я додала  {
  //         headers: { Authorization: `Bearer ${refreshToken}` },
  //       },
  return req;
});

apiService.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await authService.refresh();
          isRefreshing = false;
          runAfterRefresh();
          return await apiService(originalRequest);
        } catch (e) {
          authService.deleteTokens();
          isRefreshing = false;
          router.navigate('/login');
          return await Promise.reject(error);
        }
      }

      if (originalRequest.url === urls.auth.refresh) {
        return await Promise.reject(error);
      }

      return await new Promise((resolve) => {
        subscribeToWaitList(() => {
          resolve(apiService(originalRequest));
        });
      });
    }
    return await Promise.reject(error);
  },
);

const subscribeToWaitList = (cb: IWaitList): void => {
  waitList.push(cb);
};

const runAfterRefresh = (): void => {
  while (waitList.length) {
    const cb = waitList.pop();
    cb();
  }
};

export { apiService };
