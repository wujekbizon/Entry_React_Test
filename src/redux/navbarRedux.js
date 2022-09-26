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
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
    changeCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { openCurrency, closeCurrency, changeCategory, changeCurrency } =
  navbarSlice.actions;

export default navbarSlice.reducer;
