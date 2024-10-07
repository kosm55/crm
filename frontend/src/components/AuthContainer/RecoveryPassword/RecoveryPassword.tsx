import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { IActivate } from '../../../interfaces/activateInterface';
import { authActions } from '../../../store';
import css from './RecoveryPassword.module.css';

const RecoveryPassword = () => {
  const { register, handleSubmit } = useForm<IActivate>();
  const { recoveryError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { action, token } = useParams();

  const activate: SubmitHandler<IActivate> = async (data: {
    password: string;
    confirm_password: string;
  }) => {
    if (data.password !== data.confirm_password) {
      dispatch(authActions.setRecoveryError('Passwords do not match'));
      return;
    } //  або зробити через валідатор useForm - resolver: joiResolver(RegisterValidator),
    if (action === 'recovery-password') {
      await dispatch(
        authActions.recoveryPassword({ token, password: data.password }),
      );
    } else if (action === 'activate') {
      await dispatch(
        authActions.activateManager({ token, password: data.password }),
      );
    }
    navigate('/login');
  };
  return (
    <div className={css.Recovery}>
      <form onSubmit={handleSubmit(activate)} className={css.RecoveryForm}>
        <label className={css.RecoveryLabel} htmlFor="Password">
          Password
        </label>
        <input
          type="text"
          placeholder={'Password'}
          {...register('password')}
          className={css.RecoveryInput}
        />
        <label className={css.RecoveryLabel} htmlFor="Confirm Password">
          Confirm Password
        </label>
        <input
          type="text"
          placeholder={'Confirm Password'}
          {...register('confirm_password')}
          className={css.RecoveryInput}
        />
        <div className={css.Recovery_error}>
          {recoveryError && <h5>{recoveryError}</h5>}
        </div>
        <button className={css.RecoveryButton}>ACTIVATE</button>
      </form>
    </div>
  );
};

export { RecoveryPassword };
