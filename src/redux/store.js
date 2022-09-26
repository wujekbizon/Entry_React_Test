import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './navbarRedux';
import productReducer from './productRedux';
import cartReducer from './cartRedux';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    product: productReducer,
    cart: cartReducer,
  },
});
