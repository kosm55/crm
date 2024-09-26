import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { orderActions } from '../../store';
import { Comment } from './Comment';

interface IProps {
  id: string;
}

const Comments: FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.order);
  useEffect(() => {
    dispatch(orderActions.getById(id));
  }, [id, dispatch]);

  if (!order || !order.comments || order.comments.length === 0) {
    return null;
  }

  return (
    <div>
      {order.comments
        .filter((comment) => Object.keys(comment.user).length > 0)
        .map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
    </div>
  );
};

export { Comments };
