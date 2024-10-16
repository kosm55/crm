import { Navigate } from 'react-router-dom';

import { Login } from '../../components';
import css from './LoginPage.module.css';

const LoginPage = () => {
  const isAuth = localStorage.getItem('access');
  if (isAuth) {
    return <Navigate to="/orders" />;
  }

  return (
    <div className={css.LoginPage}>
      <Login />
    </div>
  );
};

export { LoginPage };
