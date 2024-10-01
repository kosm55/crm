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
  //Redux Toolkit виявив несеріалізоване значення -blob(для вигрузки екселю), це для ігнорування
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['orderSlice/exportToExcel/fulfilled'],
      },
    }),
});

export { store };
