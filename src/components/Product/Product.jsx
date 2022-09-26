import './Product.scss';
import React, { Component } from 'react';
import img from '../../assets/images/1.jpg';
import { Plus, Minus } from '../index';

export class Product extends Component {
  render() {
    return (
      <div className="cart-product-container">
        <div className="product-left">
          <div className="product-info">
            <h2>Apollo</h2>
            <h3>Running Short</h3>
          </div>
          <div className="price-container">
            <h4>$50</h4>
          </div>
          <div className="sizes-container">
            <h4>Size:</h4>
            <div className="size-container">
              <div className="item-size active">XS</div>
              <div className="item-size ">S</div>
              <div className="item-size ">M</div>
              <div className="item-size ">L</div>
            </div>
          </div>
          <div className="colors-container">
            <h4>Color:</h4>
            <div className="color-container">
              <div
                className="item-color active"
                style={{ backgroundColor: '#D3D2D5' }}
              ></div>
              <div
                className="item-color "
                style={{ backgroundColor: '#2B2B2B' }}
              ></div>
              <div
                className="item-color "
                style={{ backgroundColor: '#0F6450' }}
              ></div>
            </div>
          </div>
        </div>
        <div className="product-right">
          <div className="btn-container">
            <div className="icon-container">
              <Plus />
            </div>
            <h2>1</h2>
            <div className="icon-container">
              <Minus />
            </div>
          </div>
          <div className="img-container">
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
