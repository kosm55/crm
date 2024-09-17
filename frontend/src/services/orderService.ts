import { urls } from '../constants';
import { IOrder } from '../interfaces';
import { IRes } from '../types';
import { apiService } from './apiService';

const orderService = {
  getAll: (): IRes<{ data: IOrder[] }> => apiService.get(urls.orders.list),
};

export { orderService };
