import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { userActions } from '../../../store';
import css from './Pagination.module.css';

const PaginationUser = () => {
  const dispatch = useAppDispatch();
  const { total, limit, page } = useAppSelector((state) => state.user);
  const totalPages = Math.ceil(total / limit);
  const [query, setQuery] = useSearchParams();

  // Отримуємо значення сторінки з QueryParams
  const pageFromQuery = parseInt(query.get('page'), 10) || 1;

  // Встановлюємо offset на основі значення сторінки
  useEffect(() => {
    const newOffset = (pageFromQuery - 1) * limit;

    if (page !== pageFromQuery) {
      dispatch(userActions.setPage(pageFromQuery));
    }

    dispatch(
      userActions.getAll({
        limit,
        offset: newOffset,
      }),
    );
  }, [pageFromQuery, dispatch, limit]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setQuery((prevQuery) => {
      const updatedParams = new URLSearchParams(prevQuery);
      updatedParams.set('page', value.toString());
      return updatedParams;
    });
  };

  return (
    <div className={css.PaginationBlock}>
      <Stack spacing={4}>
        <Pagination
          className={css.Page}
          count={totalPages}
          page={pageFromQuery}
          onChange={handleChange}
          color="standard"
        />
      </Stack>
    </div>
  );
};

export { PaginationUser };
