import { FC } from 'react';

import { IGroup, IOrder, IUser } from '../../../interfaces';
import { Order } from '../Order';
import css from '../Order/Order.module.css';
import { OrderHeader } from '../OrderHeader';

interface IState {
  orders: IOrder[];
  sort: (field: string) => void;
  groups: IGroup[];
  users: IUser[];
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}
const Orders: FC<IState> = ({ orders, users, sort, groups, setTrigger }) => {
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
          setTrigger={setTrigger}
        />
      ))}
    </div>
  );
};

export { Orders };
