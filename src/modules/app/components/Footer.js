
import React, { Component } from 'react';
import moment from 'moment';
import {connect} from 'react-redux';

class Footer extends Component{
 
 render () {
  
  const { isLoggedIn } = this.props;
  
  var current_time = new moment ().format("YYYY");

  if (isLoggedIn) {
    var footerStyles = {
      color: '#000000',
      padding: '1em 0 2em 0'
    }
  } else {
    footerStyles = {
      color: '#ffffff'
    }
  }

  return(
    <footer className="container footer" >
      <nav className="row">
        <p className="nav footer-text" style={footerStyles}> 
          @ {current_time} Umati Capital. All rights reserved
        </p>
      </nav>
    </footer>
  )
 }
}

function mapStateToProps(state){
  return {
    isLoggedIn: !!state.sessions.auth_token
  }
}

export default connect(mapStateToProps)(Footer);
