import './Home.scss';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import { client } from '../requestMethods';
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
} from '../redux/productRedux';
import { addProduct, calculateTotals, increase } from '../redux/cartRedux';
import { Cart, CartModal } from '../components';

class Home extends PureComponent {
  state = {
    quantity: 1,
    size: '',
    usb: '',
    touch: '',
    capacity: '',
    color: '',
  };

  componentDidMount() {
    this.props.getProductsStart();
    this.onStartFetch('all');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.onStartFetch(this.props.category);
    }
    if (prevProps.cartProducts !== this.props.cartProducts) {
      this.props.calculateTotals();
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

  onAddProduct = (id, product) => {
    const sameProduct = this.props.cartProducts.find((item) => item.id === id);
    if (sameProduct && sameProduct.id === id) {
      this.props.increase(id);
    } else {
      this.props.addProduct({
        ...product,
        quantity: 1,
        size: product.attributes[0]?.items[0].value,
        capacity: product.attributes[0]?.items[0].value,
        color: product.attributes[1]?.items[0].value,
        touch: product.attributes[1]?.items[0].value,
        usb: product.attributes[2]?.items[0].value,
      });
    }
  };

  render() {
    const { loading, category, products, currency, isCartOpen } = this.props;

    if (loading) {
      return <h1 className="loading">Loading...</h1>;
    }

    return (
      <>
        {isCartOpen && <CartModal />}
        <main className="products-page">
          <section className="category-title">
            <h2>{category.toUpperCase()}</h2>
          </section>
          <section className="products-container">
            {products.map((product) => {
              return (
                <div
                  key={product.id}
                  className={
                    !product.inStock
                      ? 'product-container out-of-stock'
                      : 'product-container'
                  }
                >
                  <Link className="link" to={`product/${product.id}`}>
                    <img src={product.gallery[0]} alt={product.name} />
                  </Link>
                  {!product.inStock && (
                    <div className="out-stock-container">
                      <h2>OUT OF STOCK</h2>
                    </div>
                  )}
                  {product.inStock && (
                    <div
                      className="add-item"
                      onClick={() => this.onAddProduct(product.id, product)}
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
                </div>
              );
            })}
          </section>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.navbar.category,
  products: state.product.products,
  loading: state.product.isLoading,
  error: state.product.isError,
  currency: state.navbar.currency,
  cartProducts: state.cart.products,
  isCartOpen: state.navbar.isCartOpen,
});

const mapDispatchToProps = {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  addProduct,
  calculateTotals,
  increase,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
