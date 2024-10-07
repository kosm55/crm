import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Footer, Orders, OrderSearchForm, PaginationMain } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { IQueryParamsFilters } from '../interfaces/queryInterface';
import { optionAction, orderActions, userActions } from '../store';

const OrdersPage = () => {
  const [trigger, setTrigger] = useState(false);
  const { orders, limit, offset } = useAppSelector((state) => state.order);
  const {
    users,
    limit: userLimit,
    offset: userOffset,
  } = useAppSelector((state) => state.user);
  const { groups, status, courseFormat, course, courseType } = useAppSelector(
    (state) => state.option,
  );
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const dispatch = useAppDispatch();
  const [, setQuery] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(optionAction.getGroups());
    dispatch(optionAction.getStatuses());
    dispatch(optionAction.getCourses());
    dispatch(optionAction.getCourseFormats());
    dispatch(optionAction.getCourseTypes());
    dispatch(userActions.getAll({ limit: userLimit, offset: userOffset }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      orderActions.getAll({ limit, offset, sortField, sortOrder, filters }),
    );
  }, [dispatch, sortField, sortOrder, filters, trigger]);

  const sort = async (field: string) => {
    const newSortOrder =
      sortField === field && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortField(field);
    setSortOrder(newSortOrder);
    setQuery({ sortField: field, sortOrder: newSortOrder });
  };

  const resetFilters = () => {
    setFilters({});
    setQuery({});
    setTrigger((prev) => !prev);
  };

  const loadingXlsFile = async () => {
    const response = await dispatch(
      orderActions.exportToExcel({
        limit,
        offset,
        sortField,
        sortOrder,
        filters,
      }),
    ).unwrap();
    const file = response as Blob;
    saveAs(file, 'orders.xlsx');
  };

  const searchOrders = (formValues: IQueryParamsFilters) => {
    const filteredParams: Record<string, string> = {};
    Object.keys(formValues).forEach((key) => {
      const value = formValues[key as keyof IQueryParamsFilters];
      if (value !== '' && value !== undefined) {
        filteredParams[key] = value;
      }
    });
    const searchParams = new URLSearchParams(filteredParams);
    //searchParams.set('page', '1');
    setFilters(formValues);
    setTrigger((prev) => !prev);

    navigate(`/orders?${searchParams.toString()}`);
  };
  return (
    <div>
      <OrderSearchForm
        groups={groups}
        status={status}
        courseFormat={courseFormat}
        course={course}
        courseType={courseType}
        resetFilters={resetFilters}
        searchOrders={searchOrders}
        loadingXlsFile={loadingXlsFile}
      />
      <Orders orders={orders} users={users} sort={sort} groups={groups} />
      <PaginationMain />
      <Footer />
    </div>
  );
};

export { OrdersPage };
