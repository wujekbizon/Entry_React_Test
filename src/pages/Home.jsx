import './Home.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import { client } from '../requestMethods';
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
} from '../redux/productRedux';
import { Cart } from '../components';

class Home extends Component {
  componentDidMount() {
    this.props.getProductsStart();
    this.onStartFetch('all');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.onStartFetch(this.props.category);
    }
  }

  onStartFetch = async (term) => {
    try {
      const { data } = await client.query({
        query: gql`
          query {
            category(input: { title: "${term}" }) {
              name
              products {
                id
                name
                inStock
                gallery
                description
                category
                brand
                prices {
                  amount
                  currency {
                    label
                    symbol
                  }
                }
              }
              
            }
          }
        `,
      });
      const allProducts = data.category.products;

      this.props.getProductsSuccess(allProducts);
    } catch (error) {
      this.props.getProductsFailure();
      console.log(error);
    }
  };

  render() {
    const { loading, category, products, currency } = this.props;

    if (loading) {
      return <h1 className="loading">Loading...</h1>;
    }

    return (
      <main className="products-page">
        <section className="category-title">
          <h2>{category.toUpperCase()}</h2>
        </section>
        <section className="products-container">
          {products.map((product) => {
            return (
              <Link
                className="link"
                to={`product/${product.id}`}
                key={product.id}
              >
                <div
                  className={
                    !product.inStock
                      ? 'product-container out-of-stock'
                      : 'product-container'
                  }
                >
                  <img src={product.gallery[0]} alt={product.name} />

                  {!product.inStock && (
                    <div className="out-stock-container">
                      <h2>OUT OF STOCK</h2>
                    </div>
                  )}
                  {product.inStock && (
                    <div
                      className="add-item"
                      onClick={() => console.log('add to cart')}
                    >
                      <Cart />
                    </div>
                  )}
                  <div className="product-name">
                    <h3>{product.name}</h3>
                    {currency === 'usd' && (
                      <h4>
                        {' '}
                        {product.prices[0].currency.symbol}
                        {product.prices[0].amount}
                      </h4>
                    )}
                    {currency === 'eur' && (
                      <h4>
                        {' '}
                        €{/* {product.prices[1].currency.symbol} */}
                        {product.prices[1].amount}
                      </h4>
                    )}
                    {currency === 'yen' && (
                      <h4>
                        {' '}
                        {product.prices[3].currency.symbol}
                        {product.prices[3].amount}
                      </h4>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.navbar.category,
  products: state.product.products,
  loading: state.product.isLoading,
  error: state.product.isError,
  currency: state.navbar.currency,
});

const mapDispatchToProps = {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
