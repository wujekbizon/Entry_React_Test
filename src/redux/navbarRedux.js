import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  currency: 'usd',
  category: 'all',
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
  },
});

export const { openCurrency, closeCurrency, changeCategory, changeCurrency } =
  navbarSlice.actions;

export default navbarSlice.reducer;
