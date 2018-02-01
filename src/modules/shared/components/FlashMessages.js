import React from 'react';
import Expire from './Expire';


var FlashMessage = React.createClass({
 
  render: function() {
    const { error, message, showMessages } = this.props;

    let error_div = null;

    if(showMessages){
      if(error){
        error_div = <Expire delay={5000}>
            <div className="alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:&nbsp;</span>
              {
                message.map(function(m) {
                    return <span>{m.detail}</span>;
                })
              }
            </div>
          </Expire>;
      }else{
        error_div =<Expire delay={5000}>
            <div className="alert alert-success" role="alert">
              <span className="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>
              <span className="sr-only">Success:&nbsp;</span>
              {
                message.map(function(m) {
                    return <span>{m.detail}</span>;
                })
              }
            </div>
        </Expire>;
      }
    }
    
    return <div>{error_div}</div>;
  }
});

export default FlashMessage;