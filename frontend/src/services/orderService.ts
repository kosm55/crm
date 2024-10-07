import { AxiosRequestConfig } from 'axios';

import { urls } from '../constants';
import { IOrder, IOrderFull } from '../interfaces';
import { IComment } from '../interfaces/commnetInterface';
import { IGroup, IGroupData } from '../interfaces/groupInterface';
import { IQueryParams } from '../interfaces/queryInterface';
import { ITotalStatistic } from '../interfaces/statisticInterface';
import { IRes } from '../types';
import { apiService } from './apiService';

const orderService = {
  getAll: (
    query: IQueryParams,
  ): IRes<{
    data: IOrder[];
    meta: { total: number; limit: number; offset: number };
  }> => {
    const { limit, offset, sortField, sortOrder, filters } = query;
    const params: Record<string, any> = { limit, offset };

    if (sortField) params.sortField = sortField;
    if (sortOrder) params.sortOrder = sortOrder;
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key as keyof typeof filters]) {
          params[key] = filters[key as keyof typeof filters];
        }
      });
    }
    return apiService.get(urls.orders.list, { params });
  },
  exportToExcel: (
    query: IQueryParams,
    config?: AxiosRequestConfig,
  ): IRes<Blob> => {
    const { limit, offset, sortField, sortOrder, filters } = query;
    const params: Record<string, any> = { limit, offset };

    if (sortField) params.sortField = sortField;
    if (sortOrder) params.sortOrder = sortOrder;
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key as keyof typeof filters]) {
          params[key] = filters[key as keyof typeof filters];
        }
      });
    }
    return apiService.get(urls.orders.exportToExcel, {
      ...config,
      params,
      responseType: 'blob',
    });
  },
  getById: (orderId: string): IRes<IOrderFull> =>
    apiService.get(urls.orders.byId(orderId)),
  getCommentByPostId: (orderId: string): IRes<IOrderFull> =>
    apiService.get(urls.orders.byId(orderId)),
  getStatuses: (): IRes<string[]> => apiService.get(urls.orders.getStatuses),
  getGroups: (): IRes<IGroup[]> => apiService.get(urls.orders.getGroups),
  createGroup: (group: IGroupData): IRes<IGroup> =>
    apiService.post(urls.orders.createGroup, group),
  getCourses: (): IRes<string[]> => apiService.get(urls.orders.getCourses),
  getCourseTypes: (): IRes<string[]> =>
    apiService.get(urls.orders.getCourseTypes),
  getCourseFormats: (): IRes<string[]> =>
    apiService.get(urls.orders.getCourseFormats),
  updateById: (orderId: string, orderData: Partial<IOrder>): IRes<IOrder> =>
    apiService.put(urls.orders.updateById(orderId), orderData),
  addComment: (orderId: string, comment: IComment): IRes<any> =>
    apiService.post(urls.orders.addComment(orderId), comment),
  getStatistic: (): IRes<ITotalStatistic> =>
    apiService.get(urls.orders.statistics),
  getManagerStatistic: (managerId: string): IRes<ITotalStatistic> =>
    apiService.get(urls.orders.managerStatistic(managerId)),
};

export { orderService };
