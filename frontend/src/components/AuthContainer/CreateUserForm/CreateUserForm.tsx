import { joiResolver } from '@hookform/resolvers/joi';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IUserRegister } from '../../../interfaces';
import { authActions } from '../../../store';
import { RegisterValidator } from '../../../validators';
import css from './CreateUserForm.module.css';

interface IState {
  closeCreateUserForm: () => void;
  setTrigger: (value: any) => void;
}
const CreateUserForm: FC<IState> = ({ closeCreateUserForm, setTrigger }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    mode: 'onSubmit',
    resolver: joiResolver(RegisterValidator),
  });
  const {} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const create: SubmitHandler<IUserRegister> = async (formData) => {
    await dispatch(
      authActions.register({
        user: formData,
      }),
    );
    closeCreateUserForm();
    setTrigger((prev: boolean) => !prev);
  };
  return (
    <form className={css.CreateForm}>
      <div>
        <div>
          <label className={css.CreateLabel}>Email</label>
          <input
            placeholder={'Email'}
            type="text"
            {...register('email')}
            className={css.CreateInput}
          />
          {errors.email && (
            <span className={css.CreateError}>{errors.email.message}</span>
          )}
        </div>
        <div>
          <label className={css.CreateLabel}>Name</label>
          <input
            placeholder={'Name'}
            type="text"
            {...register('name')}
            className={css.CreateInput}
          />
          {errors.name && (
            <span className={css.CreateError}>{errors.name.message}</span>
          )}
        </div>
        <div>
          <label className={css.CreateLabel}>Surname</label>
          <input
            placeholder={'Surname'}
            type="text"
            {...register('surname')}
            className={css.CreateInput}
          />
          {errors.surname && (
            <span className={css.CreateError}>{errors.surname.message}</span>
          )}
        </div>
      </div>
      <div>
        <button className={css.CreateButton} onClick={closeCreateUserForm}>
          CANCEL
        </button>
        <button className={css.CreateButton} onClick={handleSubmit(create)}>
          CREATE
        </button>
      </div>
    </form>
  );
};

export { CreateUserForm };
