import { FC } from 'react';

import css from '../Order/Order.module.css';

interface IProp {
  sort: (field: string) => void;
}

const OrderHeader: FC<IProp> = ({ sort }) => {
  return (
    <div className={css.orderHeader}>
      <div className={css.orderCell} onClick={() => sort('name')}>
        Name
      </div>
      <div className={css.orderCell} onClick={() => sort('surname')}>
        Surname
      </div>
      <div className={css.orderCell} onClick={() => sort('email')}>
        Email
      </div>
      <div className={css.orderCell} onClick={() => sort('phone')}>
        Phone
      </div>
      <div className={css.orderCell} onClick={() => sort('age')}>
        Age
      </div>
      <div className={css.orderCell} onClick={() => sort('course')}>
        Course
      </div>
      <div className={css.orderCell} onClick={() => sort('course_format')}>
        Course Format
      </div>
      <div className={css.orderCell} onClick={() => sort('course_type')}>
        Course Type
      </div>
      <div className={css.orderCell} onClick={() => sort('group')}>
        Group
      </div>
      <div className={css.orderCell} onClick={() => sort('status')}>
        Status
      </div>
      <div className={css.orderCell} onClick={() => sort('sum')}>
        Sum
      </div>
      <div className={css.orderCell} onClick={() => sort('already_paid')}>
        Already Paid
      </div>
      <div className={css.orderCell} onClick={() => sort('created_at')}>
        Created At
      </div>
      <div className={css.orderCell} onClick={() => sort('manager')}>
        Manager
      </div>
    </div>
  );
};

export { OrderHeader };
