import { FC } from 'react';

import { IOrder, IUser } from '../../interfaces';
import { IGroup } from '../../interfaces/groupInterface';
import { Order } from './Order';
import css from './Order.module.css';
import { OrderHeader } from './OrderHeader';

interface IState {
  orders: IOrder[];
  sort: (field: string) => void;
  groups: IGroup[];
  users: IUser[];
}
const Orders: FC<IState> = ({ orders, users, sort, groups }) => {
  return (
    <div className={css.orderTable}>
      <OrderHeader sort={sort} />
      {orders.map((order, index) => (
        <Order
          key={index}
          order={order}
          index={index}
          groups={groups}
          users={users}
        />
      ))}
    </div>
  );
};

export { Orders };
