import React, { Component } from 'react';

class Header extends Component {
  render() {
  	const styles = { width: '100%', maxHeight: '15vh' };
    return (
      <div className="navbar">
        <div className="nav-brand brand">
          <div className="brand-text">
          	<img src="/img/c-header.png" alt="React Location Calculator" style={styles} />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;