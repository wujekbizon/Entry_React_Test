import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './navbarRedux';
import productReducer from './productRedux';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    product: productReducer,
  },
});
