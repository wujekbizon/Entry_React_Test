import './Home.scss';
import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const cache = new InMemoryCache();

const client = new ApolloClient({
  cache: cache,
  uri: 'http://localhost:4000/',
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

class Home extends Component {
  state = { products: [] };

  componentDidMount() {
    this.onStartFetch('all');
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
      this.setState({ products: allProducts });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <main className="products-page">
        <section className="category-title">
          <h2>Category name</h2>
        </section>
        <section className="products-container">
          {this.state.products.map((product) => {
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

export default Home;
