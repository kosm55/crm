import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../hooks';
import { IGroupData } from '../../../interfaces';
import { optionAction } from '../../../store';
import css from '../OrderForm/OrderForm.module.css';

interface IState {
  setIsAddGroup: (state: boolean) => void;
}
const GroupForm: FC<IState> = ({ setIsAddGroup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGroupData>();
  const dispatch = useAppDispatch();

  const addGroup: SubmitHandler<IGroupData> = async (group) => {
    await dispatch(optionAction.createGroup(group));
    setIsAddGroup(false);
  };
  return (
    <div>
      <input
        className={css.OrderFormInput}
        type="text"
        {...register('group')}
      />
      {errors.group && (
        <span className={css.ErrorMessage}>{errors.group.message}</span>
      )}
      <button className={css.btnGroupForm} onClick={handleSubmit(addGroup)}>
        ADD
      </button>
      <button className={css.btnGroupForm} onClick={() => setIsAddGroup(false)}>
        SELECT
      </button>
    </div>
  );
};

export { GroupForm };
