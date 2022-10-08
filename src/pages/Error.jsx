import React, { Component } from 'react';
import './Error.scss';
import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';

export class Error extends Component {
  render() {
    return (
      <main className="error-page">
        <div className="wrrapper">
          <img src={img} alt="not found" />
          <h3>Ohh! Page Not Found</h3>
          <p>We can't seem to find the page youe're looking for</p>
          <Link to="/">back home</Link>
        </div>
      </main>
    );
  }
}

export default Error;
