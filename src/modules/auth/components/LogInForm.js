import React, { Component } from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../actions';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {credentials: {email: '', password: ""}};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.logInUser(this.state.credentials);
  }

  render() {

    return (
      <div>
        <h5 className="header-title">Sign in to Umati Capital account</h5>

        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
        >
            <TextValidator
                floatingLabelText="Email"
                name="email"
                value={this.state.credentials.email}
                validators={['required', 'isEmail']}
                onChange={this.handleChange}
                errorMessages={['This field is required', 'Email is not valid']}
                className="form-input-field"
            />

            <TextValidator
                floatingLabelText="Password"
                onChange={this.handleChange}
                name="password"
                type="password"
                validators={['required']}
                errorMessages={['This field is required']}
                value={this.state.credentials.password}
                className="form-input-field"
            />

            <div className="button-wrapper">
              <input type="submit" className="btn-block positive-button" value="Sign In"/>
            </div>
            <Link to="forgot-password" className="reset-password">Forgot your password?</Link>

        </ValidatorForm>

      </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(LogInForm);
