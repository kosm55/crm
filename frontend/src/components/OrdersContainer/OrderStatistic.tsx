import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { orderActions } from '../../store';
import css from './OrderStatistic.module.css';

const OrderStatistic = () => {
  const { statistic } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(orderActions.getStatistics());
  }, [dispatch]);
  return (
    <div className={css.OrderStatistic}>
      <h4>Orders statistic:</h4>
      <div className={css.OrderStatisticBlock}>
        <div>total: {statistic.totalCount}</div>
        <div>
          {statistic.statistic.map((item, index) => (
            <div key={index}>
              {item.status ? item.status : 'No Status'}: {item.count}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { OrderStatistic };
