import { IComments } from './commnetInterface';

export interface IOrder {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  course_format: string;
  course_type: string;
  sum: number;
  already_paid: number;
  created_at: string;
  utm: string;
  msg: string;
  status: string;
  group: string;
  manager: string;
}
export interface IOrderFull {
  _id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: string;
  course_format: string;
  course_type: string;
  sum: number;
  already_paid: number;
  created_at: string;
  utm: string;
  msg: string;
  status: string;
  group: string;
  manager: string;
  updatedAt: string;
  comments: IComments[];
}
