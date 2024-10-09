import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IGroup, IGroupData } from '../../interfaces';
import { orderService } from '../../services';

interface IState {
  status: string[];
  groups: IGroup[];
  courseType: string[];
  courseFormat: string[];
  course: string[];
  error: string;
}
const initialState: IState = {
  status: [],
  groups: [],
  courseType: [],
  courseFormat: [],
  course: [],
  error: null,
};

const getStatuses = createAsyncThunk<string[], void>(
  'optionSlice/getStatuses',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await orderService.getStatuses();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const createGroup = createAsyncThunk<IGroup, IGroupData>(
  'optionSlice/createGroup',
  async (group, { rejectWithValue }) => {
    try {
      const { data } = await orderService.createGroup(group);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const getGroups = createAsyncThunk<IGroup[], void>(
  'optionSlice/getGroups',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await orderService.getGroups();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const getCourses = createAsyncThunk<string[], void>(
  'optionSlice/getCourses',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await orderService.getCourses();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const getCourseTypes = createAsyncThunk<string[], void>(
  'optionSlice/getCourseTypes',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await orderService.getCourseTypes();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const getCourseFormats = createAsyncThunk<string[], void>(
  'optionSlice/getCourseFormats',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await orderService.getCourseFormats();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const optionsSlice = createSlice({
  name: 'optionsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getStatuses.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(getStatuses.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.course = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getCourseTypes.fulfilled, (state, action) => {
        state.courseType = action.payload;
      })
      .addCase(getCourseTypes.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getCourseFormats.fulfilled, (state, action) => {
        state.courseFormat = action.payload;
      })
      .addCase(getCourseFormats.rejected, (state, action) => {
        state.error = action.error.message;
      }),
});

const { reducer: optionReducer, actions } = optionsSlice;

const optionAction = {
  ...actions,
  getStatuses,
  getGroups,
  getCourses,
  getCourseTypes,
  getCourseFormats,
  createGroup,
};

export { optionReducer, optionAction };
