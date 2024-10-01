import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { authService } from '../../services';
import { authActions, userActions } from '../../store';
import css from './Header.module.css';

interface IState {
  resetFilters: () => void;
}
const Header: FC<IState> = ({ resetFilters }) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const access = authService.getAccessToken();

  useEffect(() => {
    if (access && !currentUser) {
      dispatch(userActions.me());
    }
  }, []);

  const logoutHandler = () => {
    authService.deleteTokens();
    dispatch(authActions.logout());
  };
  const resetPage = () => {
    resetFilters();
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };
  return (
    <div className={css.Header}>
      <div>
        <Link to={'/orders'} onClick={resetPage}>
          LOGO
        </Link>
      </div>
      <div className={css.tools}>
        {currentUser ? (
          <>
            <div className={css.name}>{currentUser.name}</div>
            {currentUser.role === 'admin' && (
              <Link to="/managers">
                <img src="/managers.svg" alt="managers" className={css.icon} />
              </Link>
            )}
            <Link to="/logout">
              <img
                src="/logOut.svg"
                alt="logOut"
                onClick={logoutHandler}
                className={css.icon}
              />
            </Link>
          </>
        ) : (
          <Link to={'/login'}>login</Link>
        )}
      </div>
    </div>
  );
};

export { Header };
