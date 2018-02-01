import React, { Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../actions';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class Forgot extends Component {
    constructor(props) {
    super(props);
    this.state = {email: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const email = event.target.value;
    this.setState({ email });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.forgotPassword(this.state.email);
  }

  render() {
    
    const { email } = this.state;

    return (

      <div className="row"> 
        <div className="container auth-container">
          <div className="col-md-offset-4 col-md-4 col-sm-offset-1 col-sm-10">
            
            <h4 className="bold-title"> Password reset request </h4>

            <p> Enter tour email address in the space below and we will email you the password reset instructions</p>

            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                <TextValidator
                    floatingLabelText="Email"
                    name="email"
                    value={ email }
                    validators={['required', 'isEmail']}
                    onChange={this.handleChange}
                    errorMessages={['This field is required', 'Email is not valid']}
                    className="form-input-field"
                />

                <div className="button-wrapper">
                  <input type="submit" className="btn-block positive-button text-uppercase" value="Request"/>
                </div>
                <Link to="/" className="reset-password">Return to Sign In </Link>

            </ValidatorForm>

          </div>
        </div>
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
  return { }
}

export default connect(mapStateToProps,mapDispatchToProps)(Forgot);

