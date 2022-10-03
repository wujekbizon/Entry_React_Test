import './Cart.scss';
import React, { Component } from 'react';
import { Product } from '../components';
import { Dollar, Pound, Yen } from '../components';
import { connect } from 'react-redux';
import { calculateTotals, clearCart } from '../redux/cartRedux';

class Cart extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currency !== this.props.currency) {
      this.props.calculateTotals();
    }
  }

  render() {
    const { quantity, total, currency, clearCart, products } = this.props;
    return (
      <main className="cart">
        <div className="top-container">
          <h1>cart</h1>
          {products.length > 0 && (
            <button type="button" onClick={() => clearCart()}>
              Clear Cart
            </button>
          )}
        </div>
        <section className="cart-items">
          <Product />
        </section>
        <section className="cart-summary">
          <div className="tax">
            <h4>Tax 21%:</h4>
            {(currency === 'usd' && <Dollar />) ||
              (currency === 'gbp' && <Pound />) ||
              (currency === 'jpy' && <Yen />)}
            <span>{(total * 0.21).toFixed(2)}</span>
          </div>
          <div className="quantity">
            <h4>
              Quantity: <span>{quantity}</span>
            </h4>
          </div>
          <div className="total">
            <h4>Total: </h4>
            {(currency === 'usd' && <Dollar />) ||
              (currency === 'gbp' && <Pound />) ||
              (currency === 'jpy' && <Yen />)}
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
  currency: state.cart.currency,
  products: state.cart.products,
});

const mapDispatchToProps = {
  clearCart,
  calculateTotals,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
