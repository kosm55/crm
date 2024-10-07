import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import {
  IAuth,
  IUser,
  IUserActivate,
  IUserRecovery,
  IUserRegister,
} from '../../interfaces';
import { authService } from '../../services';

interface IState {
  registerError: string;
  loginError: string;
  recoveryError: string;
  activateError: string;
  currentUser: IUser;
  userRecovery: IUserRecovery;
  userActivate: IUserActivate;
}
const initialState: IState = {
  registerError: null,
  loginError: null,
  recoveryError: null,
  activateError: null,
  currentUser: null,
  userRecovery: null,
  userActivate: null,
};
const register = createAsyncThunk<void, { user: IUserRegister }>(
  'authSlice/register',
  async ({ user }, { rejectWithValue }) => {
    try {
      await authService.register(user);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const login = createAsyncThunk<IUser, { user: IAuth }>(
  'authSlice/login',
  async ({ user }, { rejectWithValue }) => {
    try {
      return await authService.login(user);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const logout = createAsyncThunk<void, void>(
  'authSlice/logout',
  async (_, { rejectWithValue }) => {
    try {
      authService.deleteTokens();
      await authService.logout();
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const activateToken = createAsyncThunk<IUserActivate, string>(
  'authSlice/activateToken',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await authService.activateToken(userId);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const activateManager = createAsyncThunk<
  IUser,
  { token: string; password: string }
>(
  'authSlice/activateManager',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await authService.activateManager(token, password);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const recoveryToken = createAsyncThunk<IUserRecovery, string>(
  'authSlice/recoveryToken',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await authService.recoveryToken(userId);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);
const recoveryPassword = createAsyncThunk<
  IUser,
  { token: string; password: string }
>(
  'authSlice/recoveryPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const { data } = await authService.recoveryPassword(token, password);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setRecoveryError(state, action) {
      state.recoveryError = action.payload;
    },
    setActivationError(state, action) {
      state.activateError = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(recoveryToken.fulfilled, (state, action) => {
        state.userRecovery = action.payload;
      })
      .addCase(activateToken.fulfilled, (state, action) => {
        state.userActivate = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.registerError = 'Email already exist';
      })
      .addCase(activateManager.rejected, (state) => {
        state.activateError = 'Passwords do not match';
      })
      .addCase(recoveryPassword.rejected, (state) => {
        state.recoveryError = 'Passwords do not match';
      })
      .addCase(login.rejected, (state, action) => {
        const errorMessage = action.payload as any;
        if (errorMessage?.messages?.includes('Manager is baned')) {
          state.loginError = 'Manager is baned';
        } else {
          state.loginError = 'Wrong email or password';
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
      })
      .addMatcher(isFulfilled(register, login), (state) => {
        state.registerError = null;
        state.loginError = null;
      }),
});

const { reducer: authReducer, actions } = authSlice;

const authActions = {
  ...actions,
  register,
  login,
  logout,
  recoveryToken,
  recoveryPassword,
  activateToken,
  activateManager,
};

export { authReducer, authActions };
