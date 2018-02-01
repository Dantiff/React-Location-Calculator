import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';

class Layout extends Component {

  render() {
    const { auth_token } = this.props;

    let isLoggedIn = Boolean(auth_token);

    if (isLoggedIn){
      return (
        <div>
          {this.props.children}
        </div>
      );
    }else{
      return (
        <div>
          <Header isLoggedIn={isLoggedIn}/>
          {this.props.children}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    auth_token: state.sessions.auth_token,
  };
}

export default connect(mapStateToProps)(Layout)
