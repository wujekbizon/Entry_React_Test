import './Cart.scss';
import React, { Component } from 'react';
import { Product } from '../components';
import { Dollar, Euro, Yen } from '../components';
import { connect } from 'react-redux';
import { clearCart } from '../redux/cartRedux';

export class Cart extends Component {
  render() {
    const { quantity, total, currency, clearCart } = this.props;
    return (
      <main className="cart">
        <div className="top-container">
          <h1>cart</h1>
          <button type="button" onClick={() => clearCart()}>
            Clear Cart
          </button>
        </div>
        <section className="cart-items">
          <Product />
        </section>
        <section className="cart-summary">
          <div className="tax">
            <h4>
              Tax 21%: <span>${(total * 0.21).toFixed(2)}</span>
            </h4>
          </div>
          <div className="quantity">
            <h4>
              Quantity: <span>{quantity}</span>
            </h4>
          </div>
          <div className="total">
            <h4>Total: </h4>
            {(currency === 'usd' && <Dollar />) ||
              (currency === 'eur' && <Euro />) ||
              (currency === 'yen' && <Yen />)}
            <span>{total.toFixed(2)}</span>
          </div>
          <button type="button" className="btn-order">
            Order
          </button>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  quantity: state.cart.quantity,
  total: state.cart.total,
  currency: state.navbar.currency,
});

const mapDispatchToProps = {
  clearCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
