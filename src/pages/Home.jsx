import './Home.scss';
import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import { client } from '../requestMethods';
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
} from '../redux/productRedux';

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
              }
            }
          }
        `,
      });
      const allProducts = data.category.products;

      this.props.getProductsSuccess(allProducts);
    } catch (error) {
      this.props.getProductsFailure();
      console.log(this.props.error);
    }
  };
  render() {
    const { loading, category, products } = this.props;

    if (loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <main className="products-page">
        <section className="category-title">
          <h2>{category.toUpperCase()}</h2>
        </section>
        <section className="products-container">
          {products.map((product) => {
            return (
              <div className="product-container" key={product.id}>
                <img src={product.gallery[0]} alt={product.name} />
                <div className="product-name">
                  <h3>{product.name}</h3>
                  <h4>$50</h4>
                </div>
              </div>
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
});

const mapDispatchToProps = {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
