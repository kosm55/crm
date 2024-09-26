import { configureStore } from '@reduxjs/toolkit';

import {
  authReducer,
  loadingReducer,
  optionReducer,
  orderReducer,
  userReducer,
} from './slices';

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    auth: authReducer,
    order: orderReducer,
    option: optionReducer,
    user: userReducer,
  },
});

export { store };
