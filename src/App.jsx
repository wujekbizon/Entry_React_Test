import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Product, Cart, Error } from './pages';

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<Error />} />
      </Routes>
    );
  }
}

export default App;
