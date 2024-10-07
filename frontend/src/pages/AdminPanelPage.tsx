import { useState } from 'react';

import { CreateUserForm, Footer, OrderStatistic } from '../components';
import { Users } from '../components/UserContainer';
import css from './AdminPanelPage.module.css';

const AdminPanelPage = () => {
  const [trigger, setTrigger] = useState(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const create = () => {
    setIsCreate(true);
  };
  const closeCreateUserForm = () => {
    setIsCreate(false);
  };
  return (
    <div className={css.AdminPanelPage}>
      {isCreate && (
        <div
          className={css.AdminPanelPageBackdrop}
          onClick={closeCreateUserForm}
        ></div>
      )}
      <OrderStatistic />
      <div className={css.AdminPanelPageBlockButton}>
        {isCreate ? (
          <CreateUserForm
            closeCreateUserForm={closeCreateUserForm}
            setTrigger={setTrigger}
          />
        ) : (
          <button className={css.AdminPanelPageButton} onClick={create}>
            CREATE
          </button>
        )}
      </div>
      <Users trigger={trigger} setTrigger={setTrigger} />
      <Footer />
    </div>
  );
};

export { AdminPanelPage };
