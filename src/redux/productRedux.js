import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductsStart: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    getProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    getProductsFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { getProductsStart, getProductsSuccess, getProductsFailure } =
  productSlice.actions;

export default productSlice.reducer;
