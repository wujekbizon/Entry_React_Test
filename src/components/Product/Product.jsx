import './Product.scss';
import React, { Component } from 'react';
import { Plus, Minus, RightArrow, LeftArrow } from '../index';
import { connect } from 'react-redux';
import {
  increase,
  decrease,
  calculateTotals,
  removeProduct,
} from '../../redux/cartRedux';

export class Product extends Component {
  state = {
    galleryIndex: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.products !== this.props.products) {
      this.props.calculateTotals();
    }
  }

  render() {
    const { increase, decrease, products, currency, removeProduct } =
      this.props;

    return (
      <>
        {products.map((product) => {
          return (
            <div className="cart-product-container" key={product.id}>
              <div className="product-left">
                <div className="product-info">
                  <h2>{product.brand}</h2>
                  <h3>{product.name}</h3>
                </div>
                <div className="price-container">
                  {currency === 'usd' && (
                    <h4>
                      {' '}
                      {product.prices[0].currency.symbol}
                      {product.prices[0].amount}
                    </h4>
                  )}
                  {currency === 'gbp' && (
                    <h4>
                      {' '}
                      {product.prices[1].currency.symbol}
                      {product.prices[1].amount}
                    </h4>
                  )}
                  {currency === 'jpy' && (
                    <h4>
                      {' '}
                      {product.prices[3].currency.symbol}
                      {product.prices[3].amount}
                    </h4>
                  )}
                </div>
                {product.attributes?.map((attr) => {
                  if (attr.name === 'Size') {
                    return (
                      <div className="sizes-container" key={attr.id}>
                        <h4>{attr.name}:</h4>
                        <div className="size-container">
                          {attr.items?.map((item) => {
                            return (
                              <div
                                key={item.id}
                                className={
                                  item.value === product.size
                                    ? 'item-size active'
                                    : 'item-size'
                                }
                              >
                                {item.value}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  if (attr.name === 'Capacity') {
                    return (
                      <div className="sizes-container" key={attr.id}>
                        <h4>{attr.name}:</h4>
                        <div className="size-container">
                          {attr.items?.map((item) => {
                            return (
                              <div
                                key={item.id}
                                className={
                                  item.value === product.capacity
                                    ? 'item-size active'
                                    : 'item-size'
                                }
                              >
                                {item.value}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  if (attr.name === 'With USB 3 ports') {
                    return (
                      <div className="sizes-container" key={attr.id}>
                        <h4>{attr.name}:</h4>
                        <div className="size-container">
                          {attr.items?.map((item) => {
                            return (
                              <div
                                key={item.id}
                                className={
                                  item.value === product.usb
                                    ? 'item-size active'
                                    : 'item-size'
                                }
                              >
                                {item.value}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  if (attr.name === 'Touch ID in keyboard') {
                    return (
                      <div className="sizes-container" key={attr.id}>
                        <h4>{attr.name}:</h4>
                        <div className="size-container">
                          {attr.items?.map((item) => {
                            return (
                              <div
                                key={item.id}
                                className={
                                  item.value === product.touch
                                    ? 'item-size active'
                                    : 'item-size'
                                }
                              >
                                {item.value}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  if (attr.name === 'Color') {
                    return (
                      <div className="colors-container" key={attr.id}>
                        <h4>{attr.name}:</h4>
                        <div className="color-container">
                          {attr.items?.map((item) => {
                            return (
                              <div
                                key={item.id}
                                className={
                                  item.value === product.color
                                    ? 'item-color active'
                                    : 'item-color'
                                }
                                style={{ backgroundColor: item.value }}
                              ></div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
              <div className="product-right">
                <div className="btn-container">
                  <div
                    className="icon-container"
                    onClick={() => increase(product.id)}
                  >
                    <Plus />
                  </div>
                  <h2>{product.quantity}</h2>
                  <div
                    className="icon-container"
                    onClick={() => {
                      if (
                        product.quantity <= 1
                          ? removeProduct(product.id)
                          : decrease(product.id)
                      );
                    }}
                  >
                    <Minus />
                  </div>
                </div>
                <div className="img-container">
                  <img
                    src={product.gallery[this.state.galleryIndex]}
                    alt="item"
                  />
                  ;
                  <div className="arrows-container">
                    <div
                      className="left-arrow"
                      onClick={() =>
                        this.setState({
                          galleryIndex:
                            this.state.galleryIndex <= 0
                              ? product.gallery.length - 1
                              : this.state.galleryIndex - 1,
                        })
                      }
                    >
                      <LeftArrow />
                    </div>

                    <div
                      className="right-arrow"
                      onClick={() =>
                        this.setState({
                          galleryIndex:
                            this.state.galleryIndex >=
                            product.gallery.length - 1
                              ? 0
                              : this.state.galleryIndex + 1,
                        })
                      }
                    >
                      <RightArrow />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.cart.products,
  quantity: state.cart.quantity,
  currency: state.navbar.currency,
});
const mapDispatchToProps = {
  increase,
  decrease,
  calculateTotals,
  removeProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
