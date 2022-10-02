import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
  currency: 'usd',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      state.quantity += 1;
      state.products.push(payload);
      // state.total += payload.prices[1].amount * payload.quantity;
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
        // const prices = item.prices.map((p) => {
        //   const currency = p.currency.label.toLowerCase();
        //   return currency;
        // });
        // console.log(prices);
        if (state.currency === 'usd') {
          total += item.prices[0].amount * item.quantity;
        }
        if (state.currency === 'gbp') {
          total += item.prices[1].amount * item.quantity;
        }
        if (state.currency === 'jpy') {
          total += item.prices[3].amount * item.quantity;
        }
      });
      state.quantity = quantity;
      state.total = total;
    },
    clearCart: (state) => {
      state.products = [];
    },
    changeTotalCurrency: (state, { payload }) => {
      state.currency = payload;
    },
  },
});

export const {
  addProduct,
  calculateTotals,
  increase,
  decrease,
  clearCart,
  changeTotalCurrency,
} = cartSlice.actions;

export default cartSlice.reducer;
