import './CartModal.scss';
import React, { Component } from 'react';
import { Product } from '../index';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cartClose } from '../../redux/navbarRedux';

class CartModal extends Component {
  render() {
    const { cartClose, products } = this.props;

    return (
      <aside className="cart-modal">
        <div className="cart-mini">
          <div className="cart-title">
            <h4>My Bag</h4>
            <span>{products.length} items</span>
          </div>
          <Product />
          <div className="cart-total">
            <h4>Total:</h4>
            <span>$200</span>
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
});

const mapDispatchToProps = {
  cartClose,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
