import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IUser } from '../../interfaces';
import { userService } from '../../services/userService';

interface IState {
  currentUser: IUser;
  users: IUser[];
  total: number;
  offset: number;
  limit: number;
  error: string;
}
const initialState: IState = {
  currentUser: null,
  users: [],
  total: null,
  offset: null,
  limit: null,
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

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
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
      }),
});

const { reducer: userReducer, actions } = userSlice;

const userActions = {
  ...actions,
  me,
  getAll,
};

export { userReducer, userActions };
