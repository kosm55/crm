import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { userActions } from '../../../store';
import { SetStateFunction } from '../../../types/setStateType';
import { User } from '../User';

interface IState {
  trigger: boolean;
  setTrigger: SetStateFunction<boolean>;
}

const Users: FC<IState> = ({ trigger, setTrigger }) => {
  const { users, limit, offset } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userActions.getAll({ limit, offset }));
  }, [dispatch, trigger]);
  return (
    <div>
      {users.map((user, index) => (
        <User key={index} user={user} setTrigger={setTrigger} />
      ))}
    </div>
  );
};

export { Users };
