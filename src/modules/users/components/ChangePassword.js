import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = { creds: { current_password: '', password: '', password_confirmation: '' } };

  };

  componentWillMount() {

      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
          if (value !== this.state.creds.password) {
              return false;
          }
          return true;
      });
  };

  handleChange(event) {
    const field = event.target.name;

    const creds = this.state.creds;

    creds[field] = event.target.value;

    return this.setState({creds: creds});
  };

  handleSubmit(e) {
    e.preventDefault();

    this.props.userActions.changePassword({id: JSON.parse(localStorage.getItem("auth_user")).fingerprint, user: this.state.creds});
  };

  render() {

    const { creds } = this.state;

    return (
    <div className="row"> 
      <div className="container auth-container">
        <div className="col-lg-offset-1 col-lg-7 col-md-offset-1 col-md-7 col-sm-offset-1 col-sm-10 create-account">
          
          <h4 className="header-title"> Change Account Password </h4>

          <p className="instructions-message">Enter the details below to change account password </p>

          <ValidatorForm
              ref="form"
              onSubmit={ this.handleSubmit.bind(this) }
              onError={ errors => console.log(errors) }
          >            
            <TextValidator
                floatingLabelText="Current Password"
                onChange={this.handleChange.bind(this)}
                name="current_password"
                type="password"
                validators={['required']}
                errorMessages={['this field is required']}
                value={ creds.current_password }
                className="search-input-field"
            />            
            <TextValidator
                floatingLabelText="New Password"
                onChange={this.handleChange.bind(this)}
                name="password"
                type="password"
                validators={['required']}
                errorMessages={['this field is required']}
                value={ creds.password }
                className="search-input-field"
            />
            <TextValidator
                floatingLabelText="Confirm password"
                onChange={this.handleChange.bind(this)}
                name="password_confirmation"
                type="password"
                validators={['isPasswordMatch', 'required']}
                errorMessages={['password mismatch', 'this field is required']}
                value={ creds.password_confirmation }
                className="search-input-field"
            />


            <div className="button-wrapper">
              <button type="submit" className="btn-block primary-button text-uppercase" value=""> Change Password </button>
            </div>

          </ValidatorForm>

        </div>
      </div>
    </div> 
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

function mapStateToProps(state){
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);

