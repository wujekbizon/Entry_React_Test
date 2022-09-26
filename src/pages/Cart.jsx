import './Cart.scss';
import React, { Component } from 'react';
import { Product } from '../components';

export class Cart extends Component {
  render() {
    return (
      <main className="cart-container">
        <h1>cart</h1>
        <Product />
      </main>
    );
  }
}

export default Cart;
