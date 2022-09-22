import './Navbar.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  openCurrency,
  closeCurrency,
  changeCategory,
  changeCurrency,
} from '../../redux/navbarRedux';
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
  onSetDollar = () => {
    this.props.changeCurrency('usd');
    this.props.closeCurrency();
  };

  onSetEuro = () => {
    this.props.changeCurrency('eur');
    this.props.closeCurrency();
  };

  onSetYen = () => {
    this.props.changeCurrency('yen');
    this.props.closeCurrency();
  };

  render() {
    const { open, category, currency, closeCurrency, openCurrency } =
      this.props;
    return (
      <nav className="navbar">
        <div className="left">
          <div
            className={
              category === 'all'
                ? 'category-container active'
                : 'category-container'
            }
            onClick={() => this.props.changeCategory('all')}
          >
            <h4>all</h4>
          </div>
          <div
            className={
              category === 'tech'
                ? 'category-container active'
                : 'category-container'
            }
            onClick={() => this.props.changeCategory('tech')}
          >
            <h4>tech</h4>
          </div>
          <div
            className={
              category === 'clothes'
                ? 'category-container active'
                : 'category-container'
            }
            onClick={() => this.props.changeCategory('clothes')}
          >
            <h4>clothes</h4>
          </div>
        </div>
        <div className="center">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="right">
          <div className="currency-container">
            {(currency === 'usd' && <Dollar />) ||
              (currency === 'eur' && <Euro />) ||
              (currency === 'yen' && <Yen />)}

            {open ? (
              <FillArrowUp onClose={() => closeCurrency()} />
            ) : (
              <FillArrowDown onOpen={() => openCurrency()} />
            )}
          </div>

          <div className="cart-container">
            <EmptyCart />
            <div className="cart-items">
              <p>3</p>
            </div>
          </div>
        </div>
        <div className={open ? 'currency-switcher open' : 'currency-switcher'}>
          <button onClick={this.onSetDollar} disabled={currency === 'usd'}>
            <Dollar currency={'USD'} />
          </button>
          <button onClick={this.onSetEuro} disabled={currency === 'eur'}>
            <Euro currency={'EUR'} />
          </button>
          <button onClick={this.onSetYen} disabled={currency === 'yen'}>
            <Yen currency={'JPY'} />
          </button>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  open: state.navbar.isOpen,
  currency: state.navbar.currency,
  category: state.navbar.category,
});

const mapDispatchToProps = {
  openCurrency,
  closeCurrency,
  changeCategory,
  changeCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
