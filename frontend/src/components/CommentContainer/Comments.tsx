import { FC, useEffect, useState } from 'react';

import { useAppDispatch } from '../../hooks';
import { IComment, IComments } from '../../interfaces/commnetInterface';
import { orderActions } from '../../store';
import { Comment } from './Comment';

interface IProps {
  id: string;
  comments: IComment[];
}

const Comments: FC<IProps> = ({ id, comments: newComments }) => {
  const [comments, setComments] = useState<IComments[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadComments = async () => {
      const result = await dispatch(orderActions.getById(id)).unwrap();
      setComments(result.comments);
    };
    loadComments();
  }, [id, dispatch, newComments]);

  if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <div>
      {comments
        .filter((comment) => Object.keys(comment.user).length > 0)
        .map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
    </div>
  );
};

export { Comments };
