import { FC, useEffect, useState } from 'react';

import { useAppDispatch } from '../../hooks';
import { IUser } from '../../interfaces';
import { ITotalStatistic } from '../../interfaces/statisticInterface';
import { authActions, orderActions, userActions } from '../../store';
import css from './User.module.css';

interface IState {
  user: IUser;
  setTrigger: (value: any) => void;
}

const User: FC<IState> = ({ user, setTrigger }) => {
  const { email, name, _id, surname, isActive, isBanned } = user;
  const [managerStatistic, setManagerStatistic] = useState<ITotalStatistic>({
    statistic: [],
    totalCount: 0,
  });
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showCopyButton, setShowCopyButton] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getStat = async () => {
      const result = await dispatch(
        orderActions.getManagerStatistic(_id),
      ).unwrap();
      setManagerStatistic(result);
    };
    getStat();
  }, [dispatch, _id]);

  const ban = async () => {
    await dispatch(userActions.ban(_id));
    setTrigger((prevState: boolean) => !prevState);
  };
  const unban = async () => {
    await dispatch(userActions.unban(_id));
    setTrigger((prevState: boolean) => !prevState);
  };
  const activate = async () => {
    setShowCopyButton(true);
  };
  const copy = async () => {
    let result;
    let url;

    if (isActive) {
      result = await dispatch(authActions.recoveryToken(_id)).unwrap();
      url = `http://localhost:3000/recovery-password/${result.recoveryToken}`;
    } else {
      result = await dispatch(authActions.activateToken(_id)).unwrap();
      url = `http://localhost:3000/activate/${result.activationToken}`;
    }
    await navigator.clipboard.writeText(url);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
      setShowCopyButton(false);
    }, 2000);
  };

  return (
    <div className={css.User}>
      <div className={css.UserInfo}>
        <div className={css.UserInfoItem}>email: {email}</div>
        <div className={css.UserInfoItem}>name: {name}</div>
        <div className={css.UserInfoItem}>surname: {surname}</div>
        <div className={css.UserInfoItem}>
          isActive: {isActive ? 'true' : 'false'}
        </div>
        <div className={css.UserInfoItem}>
          isBanned: {isBanned ? 'true' : 'false'}
        </div>
      </div>
      <div className={css.UserInfoStatistic}>
        <div>total: {managerStatistic.totalCount}</div>
        <div>
          {managerStatistic.statistic.map((item, index) => (
            <div key={index}>
              {item.status ? item.status : 'No Status'}: {item.count}
            </div>
          ))}
        </div>
      </div>
      <div className={css.UserButton}>
        <button
          className={css.UserButtonItem}
          onClick={() => ban()}
          disabled={isBanned === true}
        >
          ban
        </button>
        <button
          className={css.UserButtonItem}
          onClick={() => unban()}
          disabled={isBanned === false}
        >
          unban
        </button>
        {!showCopyButton ? (
          <button className={css.UserButtonItem} onClick={() => activate()}>
            {isActive ? 'recovery password' : 'activate'}
          </button>
        ) : (
          <button className={css.UserButtonItem} onClick={() => copy()}>
            Copy to clipboard
          </button>
        )}
        {isCopied && (
          <div className={css.UserCopyMessage}>Link copied to clipboard</div>
        )}
      </div>
    </div>
  );
};

export { User };
