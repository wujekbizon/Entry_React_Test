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
  state = {
    category: 'all',
    isOpen: false,
    currency: 'usd',
    cartTotalItems: '3',
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  onOpen = () => {
    this.setState({ isOpen: true });
  };

  onSetDollar = () => {
    this.setState({ currency: 'usd' });
    this.setState({ isOpen: false });
  };
  onSetEuro = () => {
    this.setState({ currency: 'eur' });
    this.setState({ isOpen: false });
  };
  onSetYen = () => {
    this.setState({ currency: 'yen' });
    this.setState({ isOpen: false });
  };

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
            {(this.state.currency === 'usd' && <Dollar />) ||
              (this.state.currency === 'eur' && <Euro />) ||
              (this.state.currency === 'yen' && <Yen />)}

            {this.state.isOpen ? (
              <FillArrowUp onClose={this.onClose} />
            ) : (
              <FillArrowDown onOpen={this.onOpen} />
            )}
          </div>

          <div className="cart-container">
            <EmptyCart />
            <div className="cart-items">
              <p>{this.state.cartTotalItems}</p>
            </div>
          </div>
        </div>
        <div
          className={
            this.state.isOpen ? 'currency-switcher open' : 'currency-switcher'
          }
        >
          <button
            onClick={this.onSetDollar}
            disabled={this.state.currency === 'usd'}
          >
            <Dollar currency={'USD'} />
          </button>
          <button
            onClick={this.onSetEuro}
            disabled={this.state.currency === 'eur'}
          >
            <Euro currency={'EUR'} />
          </button>
          <button
            onClick={this.onSetYen}
            disabled={this.state.currency === 'yen'}
          >
            <Yen currency={'JPY'} />
          </button>
        </div>
      </nav>
    );
  }
}

export default Navbar;
