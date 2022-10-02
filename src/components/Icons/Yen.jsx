import React, { Component } from 'react';

export default class Yen extends Component {
  render() {
    return (
      <React.Fragment className="yen-sign">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fontSize={'10px'}
          width="12"
          height="15"
          viewBox="15 34 34 8"
        >
          <path
            fill="#1D1F22"
            d="M55,2.33a2,2,0,0,0-2.77.57L32,33.77,11.77,2.9A2,2,0,1,0,8.43,5.1L28.3,35.42h-14a2,2,0,0,0,0,4H30v9.06H14.27a2,2,0,0,0,0,4H30V60a2,2,0,0,0,4,0V52.48H49.73a2,2,0,0,0,0-4H34V39.42H49.73a2,2,0,0,0,0-4h-14L55.57,5.1A2,2,0,0,0,55,2.33Z"
          />
        </svg>
        <p>{this.props.currency}</p>
      </React.Fragment>
    );
  }
}
