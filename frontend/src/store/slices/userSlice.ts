import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IUser } from '../../interfaces';
import { userService } from '../../services';

interface IState {
  currentUser: IUser;
  user: IUser;
  users: IUser[];
  total: number;
  offset: number;
  limit: number;
  page: number;
  error: string;
}
const initialState: IState = {
  currentUser: null,
  user: null,
  users: [],
  total: 0,
  offset: 0,
  limit: 25,
  page: 1,
  error: null,
};

const me = createAsyncThunk<IUser, void>(
  'userSlice/me',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userService.me();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const getById = createAsyncThunk<IUser, string>(
  'userSlice/getById',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await userService.getById(userId);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const getAll = createAsyncThunk<
  { data: IUser[]; meta: { total: number; limit: number; offset: number } },
  { limit: number; offset: number }
>('userSlice/getAll', async ({ limit, offset }, { rejectWithValue }) => {
  try {
    const { data } = await userService.getAll(limit, offset);
    return data;
  } catch (e) {
    const err = e as AxiosError;
    return rejectWithValue(err.response.data);
  }
});
const ban = createAsyncThunk<string, string>(
  'userSlice/ban',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await userService.ban(userId);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const unban = createAsyncThunk<string, string>(
  'userSlice/unban',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await userService.unban(userId);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(me.pending, (state) => {
        state.error = null;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(me.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getAll.pending, (state) => {
        state.error = null;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.total = action.payload.meta.total;
        state.limit = action.payload.meta.limit;
        state.offset = action.payload.meta.offset;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.user = action.payload;
      }),
});

const { reducer: userReducer, actions } = userSlice;

const userActions = {
  ...actions,
  me,
  getById,
  getAll,
  ban,
  unban,
};

export { userReducer, userActions };
