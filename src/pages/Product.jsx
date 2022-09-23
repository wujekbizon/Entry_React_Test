import './Product.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { client } from '../requestMethods';
import { gql } from '@apollo/client';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Product extends Component {
  state = { product: {}, mainImg: null, size: '' };

  componentDidMount() {
    const { id } = this.props.params;
    if (id) {
      this.getProduct(id);
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
      console.log(product);
      this.setState({ product });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { currency } = this.props;
    const { product } = this.state;

    return (
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
          <div className="product-size">
            <h4>Size:</h4>
            <div className="size-container">
              {product.attributes?.[0]?.items.map((item) => {
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
                    {item.displayValue}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="product-color">
            <h4>Color:</h4>
            <div className="colors-container">
              <div className="item-color"></div>
              <div className="item-color"></div>
              <div className="item-color"></div>
            </div>
          </div>
          <div className="product-price">
            <h4>Price:</h4>

            {currency === 'usd' && (
              <p>
                {' '}
                {product.prices?.[0].currency.symbol}
                {product.prices?.[0].amount}
              </p>
            )}
            {currency === 'eur' && (
              <p>
                {' '}
                €{/* {product.prices[1].currency.symbol} */}
                {product.prices?.[1].amount}
              </p>
            )}
            {currency === 'yen' && (
              <p>
                {' '}
                {product.prices?.[3].currency.symbol}
                {product.prices?.[3].amount}
              </p>
            )}
          </div>
          <button type="button">Add to cart</button>
          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.products,
  currency: state.navbar.currency,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Product));
