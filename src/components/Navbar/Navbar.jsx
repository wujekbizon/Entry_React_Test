import './Navbar.scss';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  openCurrency,
  closeCurrency,
  changeCategory,
  changeCurrency,
  cartOpen,
  cartClose,
} from '../../redux/navbarRedux';
import { changeTotalCurrency } from '../../redux/cartRedux';
import {
  Logo,
  FillArrowDown,
  FillArrowUp,
  Pound,
  Dollar,
  Yen,
  EmptyCart,
} from '../index';

class Navbar extends PureComponent {
  onSetDollar = () => {
    this.props.changeCurrency('usd');
    this.props.changeTotalCurrency('usd');
    this.props.closeCurrency();
  };

  onSetEuro = () => {
    this.props.changeCurrency('gbp');
    this.props.changeTotalCurrency('gbp');
    this.props.closeCurrency();
  };

  onSetYen = () => {
    this.props.changeCurrency('jpy');
    this.props.changeTotalCurrency('jpy');
    this.props.closeCurrency();
  };

  render() {
    const {
      open,
      category,
      currency,
      closeCurrency,
      openCurrency,
      quantity,
      cartOpen,
    } = this.props;
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
              (currency === 'gbp' && <Pound />) ||
              (currency === 'jpy' && <Yen />)}

            {open ? (
              <FillArrowUp onClose={() => closeCurrency()} />
            ) : (
              <FillArrowDown onOpen={() => openCurrency()} />
            )}
          </div>

          <div className="cart-container" onClick={() => cartOpen()}>
            <EmptyCart />
            <div className="cart-items">
              <p>{quantity}</p>
            </div>
          </div>
        </div>
        <div className={open ? 'currency-switcher open' : 'currency-switcher'}>
          <button onClick={this.onSetDollar} disabled={currency === 'usd'}>
            <Dollar currency={'USD'} />
          </button>
          <button onClick={this.onSetEuro} disabled={currency === 'gbp'}>
            <Pound currency={'GBP'} />
          </button>
          <button onClick={this.onSetYen} disabled={currency === 'jpy'}>
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
  quantity: state.cart.quantity,
});

const mapDispatchToProps = {
  openCurrency,
  closeCurrency,
  changeCategory,
  changeCurrency,
  changeTotalCurrency,
  cartClose,
  cartOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
