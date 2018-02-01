import React, {Component} from 'react';
import {connect} from 'react-redux';
import LogInForm from './LogInForm';
import OtpLogInForm from './OtpLogInForm';
import { history } from '../../../store/configureStore';

var titles = ["welcome", "sign in", 'please check your SMS for your one time password'];

class LogInPage extends Component {

  componentDidMount() {
    const { isLoggedIn } = this.props

    if (isLoggedIn) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      history.replace("/users")
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isLoggedIn) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      history.replace("/users")
    }
  }

  render() {
    if(this.props.requireOtp){
      return (
        <div className="row"> 
          <div className="container auth-container">
            <div className="col-md-offset-4 col-md-4 col-sm-offset-1 col-sm-10">
               <OtpLogInForm title={titles} />
            </div>
          </div>
        </div>
      );
    }else{
      return (
        <div className="row"> 
          <div className="container auth-container">
            <div className="col-md-offset-4 col-md-4 col-sm-offset-1 col-sm-10">
              <LogInForm title={titles} />
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state){
  return {
    isLoggedIn: !!state.sessions.auth_token,
    requireOtp: state.sessions.requireOtp
  }
}

export default connect(mapStateToProps)(LogInPage);
