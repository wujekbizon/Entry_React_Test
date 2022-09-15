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
    this.onStartFetch();
  }

  onStartFetch = async () => {
    try {
      const { data } = await client.query({
        query: gql`
          query {
            category(input: { title: "all" }) {
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
    console.log(this.state);
    return (
      <div>
        {this.state.products.map((product) => {
          return <h1 key={product.id}>{product.name}</h1>;
        })}
      </div>
    );
  }
}

export default Home;
