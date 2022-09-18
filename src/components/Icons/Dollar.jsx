import React, { Component } from 'react';

export default class Dollar extends Component {
  render() {
    return (
      <div className="dollar-sign">
        <svg
          width="11"
          height="18"
          viewBox="0 0 11 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.13 14.798L6.138 14.816V17.426H5.13V14.798ZM5.22 14.6V3.638L6.03 3.512V14.636L5.22 14.6ZM5.13 0.829999H6.138V3.404L5.13 3.53V0.829999ZM9.144 5.402C9 5.234 8.808 5.072 8.568 4.916C8.328 4.76 8.058 4.622 7.758 4.502C7.458 4.37 7.128 4.268 6.768 4.196C6.42 4.112 6.054 4.07 5.67 4.07C4.686 4.07 3.96 4.256 3.492 4.628C3.024 5 2.79 5.51 2.79 6.158C2.79 6.614 2.91 6.974 3.15 7.238C3.39 7.502 3.756 7.718 4.248 7.886C4.752 8.054 5.388 8.228 6.156 8.408C7.044 8.6 7.812 8.834 8.46 9.11C9.108 9.386 9.606 9.758 9.954 10.226C10.302 10.682 10.476 11.294 10.476 12.062C10.476 12.674 10.356 13.208 10.116 13.664C9.888 14.108 9.564 14.48 9.144 14.78C8.724 15.068 8.232 15.284 7.668 15.428C7.104 15.56 6.492 15.626 5.832 15.626C5.184 15.626 4.548 15.56 3.924 15.428C3.312 15.284 2.73 15.08 2.178 14.816C1.626 14.552 1.11 14.222 0.63 13.826L1.404 12.458C1.596 12.662 1.842 12.866 2.142 13.07C2.454 13.262 2.802 13.442 3.186 13.61C3.582 13.778 4.008 13.916 4.464 14.024C4.92 14.12 5.388 14.168 5.868 14.168C6.78 14.168 7.488 14.006 7.992 13.682C8.496 13.346 8.748 12.86 8.748 12.224C8.748 11.744 8.604 11.36 8.316 11.072C8.04 10.784 7.626 10.544 7.074 10.352C6.522 10.16 5.85 9.968 5.058 9.776C4.194 9.56 3.468 9.326 2.88 9.074C2.292 8.81 1.848 8.468 1.548 8.048C1.26 7.628 1.116 7.082 1.116 6.41C1.116 5.594 1.314 4.904 1.71 4.34C2.106 3.776 2.652 3.35 3.348 3.062C4.044 2.774 4.83 2.63 5.706 2.63C6.282 2.63 6.816 2.69 7.308 2.81C7.812 2.93 8.28 3.098 8.712 3.314C9.144 3.53 9.54 3.788 9.9 4.088L9.144 5.402Z"
            fill="#1D1F22"
          />
        </svg>
        <p>{this.props.currency}</p>
      </div>
    );
  }
}
