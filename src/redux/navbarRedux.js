import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  currency: 'usd',
  category: 'all',
  isCartOpen: false,
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    openCurrency: (state) => {
      state.isOpen = true;
    },
    closeCurrency: (state) => {
      state.isOpen = false;
    },
    changeCategory: (state, { payload }) => {
      state.category = payload;
    },
    changeCurrency: (state, { payload }) => {
      state.currency = payload;
    },
    cartOpen: (state) => {
      state.isCartOpen = true;
    },
    cartClose: (state) => {
      state.isCartOpen = false;
    },
  },
});

export const {
  openCurrency,
  closeCurrency,
  changeCategory,
  changeCurrency,
  cartClose,
  cartOpen,
} = navbarSlice.actions;

export default navbarSlice.reducer;
