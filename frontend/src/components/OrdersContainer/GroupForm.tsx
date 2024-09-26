import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../hooks';
import { IGroupData } from '../../interfaces/groupInterface';
import { optionAction } from '../../store';
import css from './OrderForm.module.css';

interface IState {
  setIsAddGroup: (state: boolean) => void;
}
const GroupForm: FC<IState> = ({ setIsAddGroup }) => {
  const { register, handleSubmit } = useForm<IGroupData>();
  const dispatch = useAppDispatch();

  const addGroup: SubmitHandler<IGroupData> = async (group) => {
    // const newGroup = (await dispatch(optionAction.createGroup(group))) as {
    //   payload: IGroup;
    // };
    // console.log(newGroup);
    // setIsAddGroup(false);
    // setValue('group', newGroup.payload._id);
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
