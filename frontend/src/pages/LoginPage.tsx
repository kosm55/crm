import { Login } from '../components';
import css from './LoginPage.module.css';

const LoginPage = () => {
  // const [query] = useSearchParams(); //це щоб відхопити що сесія закінчилась ,
  // але помилка вспливає у всіх випадках коли треба логінитись ,  потім виправлю
  // const sessionExpired = query.get('SessionExpired') === 'true';
  return (
    <div className={css.LoginPage}>
      {/*{sessionExpired && (*/}
      {/*  <h6>Your session has ended, enter your login again</h6>*/}
      {/*)}*/}
      <Login />
    </div>
  );
};

export { LoginPage };
