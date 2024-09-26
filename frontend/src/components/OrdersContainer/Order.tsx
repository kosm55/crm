import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IOrder, IUser } from '../../interfaces';
import { IGroup } from '../../interfaces/groupInterface';
import css from './Order.module.css';
import { OrderDetails } from './OrderDetails';

interface IProps {
  order: IOrder;
  index: number;
  groups: IGroup[];
  users: IUser[];
}

const Order: FC<IProps> = ({ order, index, groups, users }) => {
  const [isOrderDetails, setOrderDetails] = useState(false);
  const {
    name,
    surname,
    email,
    phone,
    age,
    course,
    course_format,
    course_type,
    group,
    status,
    sum,
    already_paid,
    created_at,
    manager,
  } = order;

  const createdAtDate = new Date(created_at);
  const findGroup = groups.find((item) => item._id === group);
  const groupName = findGroup ? findGroup.group : '-';
  const findManager =
    users?.length > 0 ? users.find((user) => user._id === manager) : null;
  const managerName = findManager ? findManager.name : '-';

  const navigate = useNavigate();

  const getOrderDetails = () => {
    setOrderDetails(!isOrderDetails);
    if (!isOrderDetails) {
      navigate(`/orders/${order._id}`);
    } else {
      navigate('/orders');
    }
  };
  const closeOrderDetails = () => {
    setOrderDetails(!isOrderDetails);
    navigate('/orders');
  };
  return (
    <>
      <div onClick={getOrderDetails} className={css.orderRow} key={index}>
        <div className={css.orderCell}>{name || '-'}</div>
        <div className={css.orderCell}>{surname || '-'}</div>
        <div className={css.orderCell}>{email || '-'}</div>
        <div className={css.orderCell}>{phone || '-'}</div>
        <div className={css.orderCell}>{age || '-'}</div>
        <div className={css.orderCell}>{course || '-'}</div>
        <div className={css.orderCell}>{course_format || '-'}</div>
        <div className={css.orderCell}>{course_type || '-'}</div>
        <div className={css.orderCell}>{groupName || '-'}</div>
        <div className={css.orderCell}>{status || '-'}</div>
        <div className={css.orderCell}>{sum || '-'}</div>
        <div className={css.orderCell}>{already_paid || '-'}</div>
        <div className={css.orderCell}>
          {createdAtDate.toLocaleDateString() || '-'}
        </div>
        <div className={css.orderCell}>{managerName || '-'}</div>
      </div>
      {isOrderDetails && (
        <OrderDetails order={order} closeOrderDetails={closeOrderDetails} />
      )}
    </>
  );
};

export { Order };
