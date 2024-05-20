import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/contact/usersReducer';

export const store = configureStore({
  reducer: {
    usersReducer
  },
});
