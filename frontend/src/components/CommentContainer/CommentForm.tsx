import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { IComment } from '../../interfaces/commnetInterface';
import { orderActions } from '../../store';
import css from './CommentForm.module.css';

interface IProps {
  id: string;
  isDisabled: boolean;
}
const CommentForm: FC<IProps> = ({ id, isDisabled }) => {
  const { register, reset, handleSubmit } = useForm<IComment>();
  const dispatch = useAppDispatch();

  const { limit, offset } = useAppSelector((state) => state.order);
  const [query] = useSearchParams();

  const sortField = query.get('sortField') || 'created_at';
  const sortOrder = query.get('sortOrder') || 'desc';

  const addComment: SubmitHandler<IComment> = async (comment) => {
    await dispatch(orderActions.addComment({ id, comment }));
    await dispatch(orderActions.getById(id));
    await dispatch(
      orderActions.getAll({ limit, offset, sortField, sortOrder }),
    );
    reset();
  };

  return (
    <div>
      <form className={css.commentForm} onSubmit={handleSubmit(addComment)}>
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
