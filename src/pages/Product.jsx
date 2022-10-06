import './Product.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { client } from '../requestMethods';
import { gql } from '@apollo/client';
import { addProduct, calculateTotals, increase } from '../redux/cartRedux';
import { CartModal } from '../components';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Product extends Component {
  state = {
    product: {},
    mainImg: null,
    size: 'S',
    capacity: '512GB',
    color: '#03FFF7',
    touch: 'Yes',
    usb: 'Yes',
    quantity: 1,
  };

  componentDidMount() {
    const { id } = this.props.params;
    if (id) {
      this.getProduct(id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.products !== this.props.products) {
      this.props.calculateTotals();
    }
  }

  getProduct = async (id) => {
    try {
      const { data } = await client.query({
        query: gql`
          query {
            product(id: "${id}" ) {
              id
              name
              inStock
              gallery
              description
              category
              brand
              attributes {
                id
                name
                type
                items{
                  displayValue
                  value
                  id
                }
              }
              prices {
                amount
                currency {
                  label
                  symbol
                }
              }
            }
          }
        `,
      });

      const product = data.product;
      this.setState({ product });
    } catch (error) {
      console.log(error);
    }
  };

  onAddProduct = (id, product) => {
    const sameProduct = this.props.cartProducts.find((item) => item.id === id);
    if (sameProduct && sameProduct.id === id) {
      this.props.increase(id);
    } else {
      this.props.addProduct({
        ...product,

        ...this.state,
      });
    }
  };

  render() {
    const { currency, addProduct, isCartOpen } = this.props;
    const { product, quantity, size, capacity, color, usb, touch } = this.state;

    return (
      <>
        {isCartOpen && <CartModal />}
        <main className="product">
          <div className="product-img">
            <div className="side-images">
              {product.gallery?.map((img, index) => {
                return (
                  <div
                    className="thumb-img"
                    key={index}
                    onClick={() => this.setState({ mainImg: img })}
                  >
                    <img src={img} alt="img" />
                  </div>
                );
              })}
            </div>
            <div className="main-img">
              <img
                src={this.state.mainImg || product.gallery?.[0]}
                alt={product.name}
              />
            </div>
          </div>

          <div className="product-container">
            <div>
              <h2>{product.brand}</h2>
              <h3>{product.name}</h3>
            </div>

            {product.attributes?.map((attr) => {
              if (attr.name === 'Size') {
                return (
                  <div className="items-content" key={attr.id}>
                    <h4>{attr.name}:</h4>
                    <div className="items-container">
                      {attr.items?.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className={
                              this.state.size === item.value
                                ? 'item-size active'
                                : 'item-size'
                            }
                            onClick={() => this.setState({ size: item.value })}
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
                  <div className="items-content" key={attr.id}>
                    <h4>{attr.name}:</h4>
                    <div className="items-container">
                      {attr.items?.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className={
                              this.state.capacity === item.value
                                ? 'item-size active'
                                : 'item-size'
                            }
                            onClick={() =>
                              this.setState({ capacity: item.value })
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
                  <div className="items-content" key={attr.id}>
                    <h4>{attr.name}:</h4>
                    <div className="items-container">
                      {attr.items?.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className={
                              this.state.usb === item.value
                                ? 'item-size active'
                                : 'item-size'
                            }
                            onClick={() => this.setState({ usb: item.value })}
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
                  <div className="items-content" key={attr.id}>
                    <h4>{attr.name}:</h4>
                    <div className="items-container">
                      {attr.items?.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className={
                              this.state.touch === item.value
                                ? 'item-size active'
                                : 'item-size'
                            }
                            onClick={() => this.setState({ touch: item.value })}
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
                  <div className="product-colors" key={attr.id}>
                    <h4>{attr.name}:</h4>
                    <div className="colors-container">
                      {attr.items?.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className={
                              this.state.color === item.value
                                ? 'item-color active'
                                : 'item-color'
                            }
                            onClick={() => this.setState({ color: item.value })}
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

            <div className="product-price">
              <h4>Price:</h4>

              {currency === 'usd' && (
                <p>
                  {' '}
                  {product.prices?.[0].currency.symbol}
                  {product.prices?.[0].amount}
                </p>
              )}
              {currency === 'gbp' && (
                <p>
                  {' '}
                  {product.prices[1].currency.symbol}
                  {product.prices?.[1].amount}
                </p>
              )}
              {currency === 'jpy' && (
                <p>
                  {' '}
                  {product.prices?.[3].currency.symbol}
                  {product.prices?.[3].amount}
                </p>
              )}
            </div>
            <button
              type="button"
              disabled={!product.inStock}
              onClick={() => {
                addProduct({
                  ...product,

                  quantity,
                  size,
                  capacity,
                  color,
                  touch,
                  usb,
                });
              }}
            >
              {product.inStock ? 'Add to cart' : 'Out of stock'}
            </button>
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.navbar.currency,
  products: state.cart.products,
  isCartOpen: state.navbar.isCartOpen,
});

const mapDispatchToProps = { addProduct, calculateTotals, increase };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Product));
