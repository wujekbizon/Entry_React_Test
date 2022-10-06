import './CartModal.scss';
import React, { Component } from 'react';
import { Product } from '../index';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cartClose } from '../../redux/navbarRedux';
import { Dollar, Pound, Yen } from '../index';

class CartModal extends Component {
  render() {
    const { cartClose, products, total, currency } = this.props;

    return (
      <aside className="cart-modal">
        <div className="cart-mini">
          <div className="cart-title">
            <div className="cart-bag">
              <h4>My Bag:</h4>
              <span>{products.length} items</span>
            </div>
            <div className="close-bag" onClick={() => cartClose()}>
              Close
            </div>
          </div>
          <Product />
          <div className="cart-total">
            <h4>Total:</h4>
            <div className="currency-cart">
              {(currency === 'usd' && <Dollar />) ||
                (currency === 'gbp' && <Pound />) ||
                (currency === 'jpy' && <Yen />)}
              <span>{total.toFixed(2)}</span>
            </div>
          </div>
          <div className="btn-container">
            <Link to="/cart" onClick={() => cartClose()}>
              <button className="btn-bag">View Bag</button>
            </Link>
            <button className="btn-checkout">Checkout</button>
          </div>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.cart.products,
  total: state.cart.total,
  currency: state.cart.currency,
});

const mapDispatchToProps = {
  cartClose,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
