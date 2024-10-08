import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
  IComment,
  IOrder,
  IOrderFull,
  IQueryParams,
  ITotalStatistic,
} from '../../interfaces';
import { orderService } from '../../services';

interface IState {
  orders: IOrder[];
  order: IOrderFull;
  total: number;
  offset: number;
  limit: number;
  error: string;
  page: number;
  statistic: ITotalStatistic;
}
const initialState: IState = {
  orders: [],
  order: null,
  total: 0,
  offset: 0,
  limit: 25,
  error: null,
  page: 1,
  statistic: { statistic: [], totalCount: 0 },
};

const getAll = createAsyncThunk<
  { data: IOrder[]; meta: { total: number; limit: number; offset: number } },
  IQueryParams
>('orderSlice/getAll', async (query, { rejectWithValue }) => {
  try {
    const { data } = await orderService.getAll(query);
    return data;
  } catch (e) {
    const err = e as AxiosError;
    return rejectWithValue(err.response.data);
  }
});
const exportToExcel = createAsyncThunk<Blob, IQueryParams>(
  'orderSlice/exportToExcel',
  async (query, { rejectWithValue }) => {
    try {
      const response = await orderService.exportToExcel(query, {
        responseType: 'blob',
      });
      return response.data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);
const getById = createAsyncThunk<IOrderFull, string>(
  'orderSlice/getById',
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await orderService.getById(orderId);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const updateById = createAsyncThunk<
  IOrder,
  { id: string; orderData: Partial<IOrder> }
>('orderSlice/updateById', async ({ id, orderData }, { rejectWithValue }) => {
  try {
    const { data } = await orderService.updateById(id, orderData);
    return data;
  } catch (e) {
    const err = e as AxiosError;
    return rejectWithValue(err.response.data);
  }
});
const addComment = createAsyncThunk<
  IOrderFull,
  { id: string; comment: IComment }
>('orderSlice/addComment', async ({ id, comment }, { rejectWithValue }) => {
  try {
    const { data } = await orderService.addComment(id, comment);
    return data;
  } catch (e) {
    const err = e as AxiosError;
    return rejectWithValue(err.response.data);
  }
});
const getStatistics = createAsyncThunk<ITotalStatistic>(
  'orderSlice/getStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await orderService.getStatistic();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const getManagerStatistic = createAsyncThunk<ITotalStatistic, string>(
  'orderSlice/getManagerStatistic',
  async (managerId, { rejectWithValue }) => {
    try {
      const { data } = await orderService.getManagerStatistic(managerId);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getById.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.orders = action.payload.data;
        state.total = action.payload.meta.total;
        state.limit = action.payload.meta.limit;
        state.offset = action.payload.meta.offset;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.statistic = action.payload;
      })
      .addCase(getById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(exportToExcel.rejected, (state, action) => {
        state.error = action.error.message;
      }),
});

const { reducer: orderReducer, actions } = orderSlice;
const orderActions = {
  ...actions,
  getAll,
  exportToExcel,
  getById,
  updateById,
  addComment,
  getStatistics,
  getManagerStatistic,
};

export { orderReducer, orderActions };
