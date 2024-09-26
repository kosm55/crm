import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { orderActions } from '../../store';

const PaginationMain = () => {
  const dispatch = useAppDispatch();
  const { total, limit } = useAppSelector((state) => state.order);
  const totalPages = Math.ceil(total / limit);
  const [query, setQuery] = useSearchParams();

  // Отримуємо значення сторінки з QueryParams
  const pageFromQuery = parseInt(query.get('page'), 10) || 1;
  const sortField = query.get('sortField') || 'created_at';
  const sortOrder = query.get('sortOrder') || 'desc';

  // Встановлюємо offset на основі значення сторінки
  useEffect(() => {
    const newOffset = (pageFromQuery - 1) * limit;
    // Завантаження нових даних
    dispatch(
      orderActions.getAll({ limit, offset: newOffset, sortOrder, sortField }),
    );
  }, [pageFromQuery, dispatch, limit, sortOrder, sortField]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setQuery({ page: value.toString() }); // Оновлюємо QueryParams
  };

  return (
    <Stack spacing={4}>
      <Pagination
        count={totalPages}
        page={pageFromQuery}
        onChange={handleChange}
        color="primary"
      />
    </Stack>
  );
};

export { PaginationMain };
