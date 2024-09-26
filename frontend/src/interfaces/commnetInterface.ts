import { IUserForOrder } from './userInteface';

export interface IComments {
  _id: string;
  body: string;
  created_at: string;
  user: IUserForOrder;
}
export interface IComment {
  body: string;
}
