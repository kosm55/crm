import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../hooks';
import { IComment } from '../../../interfaces';
import { orderActions } from '../../../store';
import css from './CommentForm.module.css';

interface IProps {
  id: string;
  isDisabled: boolean;
  addComment: (newComment: IComment) => void;
}
const CommentForm: FC<IProps> = ({ id, isDisabled, addComment }) => {
  const { register, reset, handleSubmit } = useForm<IComment>();
  const dispatch = useAppDispatch();

  const addComments: SubmitHandler<IComment> = async (comment) => {
    await dispatch(orderActions.addComment({ id, comment }));
    addComment(comment);
    reset();
  };

  return (
    <div>
      <form className={css.commentForm} onSubmit={handleSubmit(addComments)}>
        <input
          className={css.commentInput}
          type={'text'}
          placeholder={' your comment'}
          {...register('body')}
        />
        <button
          className={css.commentButton}
          type="submit"
          disabled={isDisabled}
        >
          submit
        </button>
      </form>
    </div>
  );
};

export { CommentForm };
