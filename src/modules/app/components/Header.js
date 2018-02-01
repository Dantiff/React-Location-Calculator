import { history } from '../../../store/configureStore';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class Header extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="nav-brand brand">
          <div className="logo-text"> <img  alt="Developer Test"/> </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps)(Header);