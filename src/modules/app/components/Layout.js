import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';

class Layout extends Component {

  render() {
    return (
      <div>
        <Header isLoggedIn={true}/>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Layout)
