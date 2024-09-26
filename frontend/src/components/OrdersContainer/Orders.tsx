import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { optionAction, orderActions, userActions } from '../../store';
import { Order } from './Order';
import css from './Order.module.css';
import { OrderHeader } from './OrderHeader';

const Orders = () => {
  const { orders, limit, offset } = useAppSelector((state) => state.order);
  const {
    users,
    limit: userLimit,
    offset: userOffset,
  } = useAppSelector((state) => state.user);
  const { groups } = useAppSelector((state) => state.option);
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const dispatch = useAppDispatch();
  const [, setQuery] = useSearchParams();

  useEffect(() => {
    dispatch(orderActions.getAll({ limit, offset, sortField, sortOrder }));
  }, [dispatch, sortField, sortOrder]);

  useEffect(() => {
    dispatch(optionAction.getGroups());
    dispatch(userActions.getAll({ limit: userLimit, offset: userOffset }));
  }, [dispatch]);

  const sort = async (field: string) => {
    const newSortOrder =
      sortField === field && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortField(field);
    setSortOrder(newSortOrder);
    setQuery({ sortField: field, sortOrder: newSortOrder });
  };

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
