import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      state.quantity += 1;
      state.products.push(payload);
      state.total += payload.prices[0].amount * payload.quantity;
    },
    increase: (state, { payload }) => {
      const cartItem = state.products.find((item) => {
        return item.id === payload;
      });
      cartItem.quantity += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.products.find((item) => {
        return item.id === payload;
      });
      cartItem.quantity -= 1;
    },
    calculateTotals: (state) => {
      let quantity = 0;
      let total = 0;
      state.products.forEach((item) => {
        quantity += item.quantity;
        total += item.prices[0].amount * item.quantity;
      });
      state.quantity = quantity;
      state.total = total;
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const { addProduct, calculateTotals, increase, decrease, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
