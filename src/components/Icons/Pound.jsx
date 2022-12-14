import React, { Component } from 'react';

export default class Pound extends Component {
  render() {
    return (
      <React.Fragment>
        <svg
          width="20"
          height="18"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 20.5H6.5C6.5 20.5 10 17.7413 10 13.5C10 10.6725 7.91376 9.66123 7.8837 7.30497C7.88566 2.64078 13.5005 2.88877 15.4521 4.74258M6.5 13.5H15"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p>{this.props.currency}</p>
      </React.Fragment>
    );
  }
}
