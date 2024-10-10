import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IGroupData } from '../../../interfaces';
import { optionAction } from '../../../store';
import { SetStateFunction } from '../../../types/setStateType';
import css from '../OrderForm/OrderForm.module.css';

interface IState {
  setIsAddGroup: SetStateFunction<boolean>;
}
const GroupForm: FC<IState> = ({ setIsAddGroup }) => {
  const { register, handleSubmit } = useForm<IGroupData>();
  const { error } = useAppSelector((state) => state.option);
  const dispatch = useAppDispatch();

  const addGroup: SubmitHandler<IGroupData> = async (group) => {
    await dispatch(optionAction.createGroup(group));
    if (error) {
      setIsAddGroup(false);
    }
  };
  return (
    <div>
      <div>
        <input
          className={css.OrderFormInput}
          type="text"
          {...register('group')}
        />

        <button className={css.btnGroupForm} onClick={handleSubmit(addGroup)}>
          ADD
        </button>
        <button
          className={css.btnGroupForm}
          onClick={() => setIsAddGroup(false)}
        >
          SELECT
        </button>
      </div>
      {error && <span className={css.ErrorMessage}>{error}</span>}
    </div>
  );
};

export { GroupForm };
