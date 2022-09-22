import './Product.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { client } from '../requestMethods';

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class Product extends Component {
  state = { mainImg: null, size: 'm' };

  onHandleSize = (value) => {
    if (value === 'xs') {
      this.setState({ size: 'xs' });
    } else if (value === 's') {
      this.setState({ size: 's' });
    } else if (value === 'm') {
      this.setState({ size: 'm' });
    } else {
      this.setState({ size: 'l' });
    }
  };

  render() {
    let { id } = this.props.params;
    const { products } = this.props;
    const foundProduct = products.find((product) => product.id === id);

    return (
      <main className="product">
        <div className="product-img">
          <div className="side-images">
            {foundProduct?.gallery.map((img, index) => {
              return (
                <div
                  className="thumb-img"
                  key={index}
                  onClick={() => this.setState({ mainImg: img })}
                >
                  <img src={img} alt={foundProduct?.name} />
                </div>
              );
            })}
          </div>
          <div className="main-img">
            <img
              src={this.state.mainImg || foundProduct?.gallery[0]}
              alt={foundProduct?.name}
            />
          </div>
        </div>

        <div className="product-container">
          <div>
            <h2>{foundProduct?.brand}</h2>
            <h3>{foundProduct?.name}</h3>
          </div>
          <div className="product-size">
            <h4>Size:</h4>
            <div className="size-container">
              <div
                className={
                  this.state.size === 'xs' ? 'item-size active' : 'item-size'
                }
                onClick={() => this.onHandleSize('xs')}
              >
                XS
              </div>
              <div
                className={
                  this.state.size === 's' ? 'item-size active' : 'item-size'
                }
                onClick={() => this.onHandleSize('s')}
              >
                S
              </div>
              <div
                className={
                  this.state.size === 'm' ? 'item-size active' : 'item-size'
                }
                onClick={() => this.onHandleSize('m')}
              >
                M
              </div>
              <div
                className={
                  this.state.size === 'l' ? 'item-size active' : 'item-size'
                }
                onClick={() => this.onHandleSize('l')}
              >
                L
              </div>
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
            <p>$50.00</p>
          </div>
          <button type="button">Add to cart</button>
          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: foundProduct.description }}
          />
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.product.products,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withParams(Product));
