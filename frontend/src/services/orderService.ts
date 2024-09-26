import { urls } from '../constants';
import { IOrder, IOrderFull } from '../interfaces';
import { IComment } from '../interfaces/commnetInterface';
import { IGroup, IGroupData } from '../interfaces/groupInterface';
import { IRes } from '../types';
import { apiService } from './apiService';

const orderService = {
  getAll: (
    limit: number,
    offset: number,
    sortField: string,
    sortOrder: string,
    filters?: {
      name?: string;
      surname?: string;
      email?: string;
      phone?: string;
      age?: number;
      course?: string;
    },
  ): IRes<{
    data: IOrder[];
    meta: { total: number; limit: number; offset: number };
  }> => {
    // apiService.get(urls.orders.list, {
    //   params: { limit, offset, sortField, sortOrder },
    const params: Record<string, any> = { limit, offset };

    // Додаємо параметри сортування, якщо вони є
    if (sortField) params.sortField = sortField;
    if (sortOrder) params.sortOrder = sortOrder;

    // Додаємо динамічні фільтри, якщо вони передані
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key as keyof typeof filters]) {
          params[key] = filters[key as keyof typeof filters];
        }
      });
    }
    // Викликаємо API із зібраними параметрами
    return apiService.get(urls.orders.list, { params });
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
};

export { orderService };
