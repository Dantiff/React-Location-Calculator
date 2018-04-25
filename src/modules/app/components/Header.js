import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="nav-brand brand">
          <div className="brand-text">
          	<img src="/static/img/c-header.png" alt="React Location Calculator" />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;