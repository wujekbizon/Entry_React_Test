import './Navbar.scss';
import React, { Component } from 'react';
import {
  Logo,
  FillArrowDown,
  FillArrowUp,
  Euro,
  Dollar,
  Yen,
  EmptyCart,
} from '../index';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="left">
          <h4 className="active">all</h4>
          <h4>tech</h4>
          <h4>clothes</h4>
        </div>
        <div className="center">
          <Logo />
        </div>
        <div className="right">
          <div className="currency-container">
            <Dollar />

            <FillArrowDown />
          </div>
          <div className="cart-container">
            <EmptyCart />

            <div className="cart-items"></div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
