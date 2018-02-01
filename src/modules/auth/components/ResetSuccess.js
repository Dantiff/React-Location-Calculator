import React, { Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../actions';
import FlatButton from 'material-ui/FlatButton';
import Footer from '../../app/components/Footer';
import Header from '../../app/components/Header';
import FullscreenDialog from 'material-ui-fullscreen-dialog'


class ResetSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = { open: true };
    this.returnHome = this.returnHome.bind(this);
  }

  returnHome () {
    this.props.actions.returnHome();
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {


    return (
      <span>
        <FullscreenDialog
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
          title={'Password reset success'}
          actionButton={<FlatButton
            label='Done'
            onTouchTap={() => this.setState({ open: false })}
          />}
        >
          <Header isLoggedIn={false} />
          <div className="row"> 
            <div className="container auth-container reset-container">
              <div className="col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10">
                <div className="reset-success-icon">
                  <p className="reset-icon-box"> <i className="fa fa-check fa-3x reset-icon"></i> </p>
                </div>
                <h3 className="reset-message">You have successfully reset your password </h3>
                <span onClick={ this.returnHome() }> <Link to="/" className="">Return to Sign In </Link> </span>
              </div>
            </div>
          </div>
          <Footer></Footer>
          
        </FullscreenDialog>

      </span>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

function mapStateToProps(state){
  return { 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ResetSuccess);

