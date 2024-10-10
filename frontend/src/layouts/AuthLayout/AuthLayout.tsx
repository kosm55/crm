import { Outlet } from 'react-router-dom';

import { Header, Loading } from '../../components';
import { useAppSelector } from '../../hooks';
import css from './AuthLayout.module.css';

const AuthLayout = () => {
  const { isLoading } = useAppSelector((state) => state.loading);
  const { error: errorOrder } = useAppSelector((state) => state.order);
  const { error: errorUser } = useAppSelector((state) => state.user);
  // const { error: errorOption } = useAppSelector((state) => state.option);
  return (
    <div>
      <div className={css.Loading}>{isLoading && <Loading />}</div>
      <div className={css.Error}>
        {errorOrder && <h5>ERROR ORDER</h5>}
        {errorUser && <h5>ERROR USER</h5>}
        {/*{errorOption && <h5>ERROR OPTION</h5>}*/}
      </div>
      <Header />
      <Outlet />
    </div>
  );
};

export { AuthLayout };
