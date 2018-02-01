import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sessionActions from '../actions';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class OtpLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {id: props.user_id,  otp_code: '' }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    const otp_code = event.target.value;
    this.setState({ otp_code });
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.actions.confirmOtp(this.state);
  }

  render() {
    
    const { otp_code, id } = this.state;

    return (
      <span>

        <p> Please check your SMS for your one time 6 digit code  </p>

        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
        >
            <TextValidator
                floatingLabelText="Enter 6 digit code"
                name="email"
                value={ otp_code }
                type="password"
                validators={['required', 'isNumber']}
                onChange={this.handleChange}
                errorMessages={['This field is required', 'Password must be digits']}
                className="form-input-field"
            />

            <div className="button-wrapper">
              <input type="submit" className="btn-block positive-button" value="Sign In"/>
            </div>
            <a onClick={ () => this.props.actions.resendOtp(id) } className="reset-password float-left"> Didn't get the code? Re-send </a>
            <a onClick={ () => this.props.actions.redirectedToLogin() } className="reset-password"> Return to Sign In </a>

        </ValidatorForm>

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
    user_id: state.sessions.user_id,
    requireOtp: state.sessions.requireOtp
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtpLoginForm);
