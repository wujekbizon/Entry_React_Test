import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './navbarRedux';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
  },
});
