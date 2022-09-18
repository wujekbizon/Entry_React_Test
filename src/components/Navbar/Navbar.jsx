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
  state = { category: 'all' };

  render() {
    return (
      <nav className="navbar">
        <div className="left">
          <div
            className={
              this.state.category === 'all'
                ? 'category-container active'
                : 'category-container'
            }
            onClick={() => this.setState({ category: 'all' })}
          >
            <h4>all</h4>
          </div>
          <div
            className={
              this.state.category === 'tech'
                ? 'category-container active'
                : 'category-container'
            }
            onClick={() => this.setState({ category: 'tech' })}
          >
            <h4>tech</h4>
          </div>
          <div
            className={
              this.state.category === 'clothes'
                ? 'category-container active'
                : 'category-container'
            }
            onClick={() => this.setState({ category: 'clothes' })}
          >
            <h4>clothes</h4>
          </div>
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
