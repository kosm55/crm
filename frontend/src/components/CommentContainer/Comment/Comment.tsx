import { FC } from 'react';

import { IComments } from '../../../interfaces';
import css from './Comment.module.css';

interface IProps {
  comment: IComments;
}

const Comment: FC<IProps> = ({ comment }) => {
  const { body, user, created_at } = comment;
  const createdAtDate = new Date(created_at);
  return (
    <div className={css.CommentBlock}>
      <div>{body}</div>
      <div className={css.CommentDetails}>
        <div className={css.CommentDetailsDiv}>
          {user.name} {user.surname}
        </div>
        <div className={css.CommentDetailsDiv}>
          {createdAtDate?.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export { Comment };
