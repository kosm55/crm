import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import { IAuth } from '../interfaces';
import { authActions } from '../store';
import css from './Login.module.css';

const Login = () => {
  const { register, handleSubmit } = useForm<IAuth>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loginError } = useAppSelector((state) => state.auth);

  const login: SubmitHandler<IAuth> = async (user) => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.login({ user }));
    if (requestStatus === 'fulfilled') {
      navigate('/orders');
    }
  };

  return (
    <div className={css.login}>
      <form onSubmit={handleSubmit(login)} className={css.LoginForm}>
        <label className={css.LoginLabel} htmlFor="email">
          Email
        </label>
        <input
          type="text"
          placeholder={'email'}
          {...register('email')}
          className={css.LoginInput}
        />
        <label className={css.LoginLabel} htmlFor="password">
          Password
        </label>
        <input
          type="text"
          placeholder={'password'}
          {...register('password')}
          className={css.LoginInput}
        />
        <div className={css.login_error}>
          {loginError && <h5>{loginError}</h5>}
        </div>
        <button className={css.LoginButton}>LOGIN</button>
      </form>
    </div>
  );
};

export { Login };
