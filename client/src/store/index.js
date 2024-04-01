import { configureStore } from '@reduxjs/toolkit';
import authSlice from './user/authSlice';
import { usersApi } from './user/apiSlice.js';

const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
    devTools: true,
});

export default store;
 