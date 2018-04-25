
import React, { Component } from 'react';
import moment from 'moment';

class Footer extends Component{
 
 render () {
  
  const current_time = new moment ().format("YYYY");

  const footerStyles = {
    color: '#000000',
    padding: '1em 0 2em 0',
    textAlign: 'center',
  }

  return(
    <footer className="container footer" >
      <nav className="row">
        <p className="nav footer-text" style={footerStyles}> 
          @ {current_time} Touch Inspiration LLC. All rights reserved
        </p>
      </nav>
    </footer>
  )
 }
}

export default Footer;
