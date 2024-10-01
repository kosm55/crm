import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { orderActions } from '../../store';
import css from './Pagination.module.css';

const PaginationMain = () => {
  const dispatch = useAppDispatch();
  const { total, limit } = useAppSelector((state) => state.order);
  const totalPages = Math.ceil(total / limit);
  const [query, setQuery] = useSearchParams();

  // Отримуємо значення сторінки з QueryParams
  const pageFromQuery = parseInt(query.get('page'), 10) || 1;
  const sortField = query.get('sortField') || 'created_at';
  const sortOrder = query.get('sortOrder') || 'desc';

  //Перетворюємо параметри запиту з URL у звичайний об'єкт
  const filters = Object.fromEntries(query.entries());
  delete filters.page;

  // Встановлюємо offset на основі значення сторінки
  useEffect(() => {
    const newOffset = (pageFromQuery - 1) * limit;
    // Завантаження нових даних
    dispatch(
      orderActions.getAll({
        limit,
        offset: newOffset,
        sortOrder,
        sortField,
        filters,
      }),
    );
  }, [pageFromQuery, dispatch, limit, sortOrder, sortField]);

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

export { PaginationMain };
