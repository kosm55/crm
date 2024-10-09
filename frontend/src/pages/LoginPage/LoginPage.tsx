import { Login } from '../../components';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={css.LoginPage}>
      <Login />
    </div>
  );
};

export { LoginPage };
