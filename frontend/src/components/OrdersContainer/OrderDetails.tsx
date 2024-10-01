import { FC, useState } from 'react';

import { useAppSelector } from '../../hooks';
import { IOrder } from '../../interfaces';
import { IComment } from '../../interfaces/commnetInterface';
import { CommentForm, Comments } from '../CommentContainer';
import css from './Order.module.css';
import { OrderForm } from './OrderForm';

interface IProps {
  order: IOrder;
  closeOrderDetails: () => void;
}
const OrderDetails: FC<IProps> = ({ order, closeOrderDetails }) => {
  const { msg, utm, _id, manager } = order;
  const [isEdit, setIsEdit] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const { currentUser } = useAppSelector((state) => state.user);
  const updateOrder = () => {
    setIsEdit(true);
  };
  const closeForm = () => {
    setIsEdit(false);
  };

  const isDisabled = manager && manager !== currentUser._id;

  const addComment = (newComment: IComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  return (
    <div className={css.orderDetails}>
      {isEdit && (
        <div className={css.OrderDetailsFormBackdrop} onClick={closeForm}></div>
      )}
      <div className={css.orderDetailsLeft}>
        <div className={css.Message}>Message: {msg || '-'}</div>
        <div className={css.Message}>UTM: {utm || '-'}</div>
      </div>

      <div className={css.orderDetailsRight}>
        <div className={css.orderDetailsRightBlock}>
          <Comments id={_id} comments={comments} />
          <CommentForm
            id={_id}
            isDisabled={isDisabled}
            addComment={addComment}
          />
        </div>
        {isEdit ? (
          <OrderForm
            order={order}
            closeForm={closeForm}
            closeOrderDetails={closeOrderDetails}
          />
        ) : (
          <button
            className={css.orderDetailsRightButton}
            onClick={updateOrder}
            disabled={isDisabled}
          >
            edit
          </button>
        )}
      </div>
    </div>
  );
};

export { OrderDetails };
