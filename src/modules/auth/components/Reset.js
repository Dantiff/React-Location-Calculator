import React, { Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as sessionActions from '../actions';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = { passwords: { password: '', password_confirmation: '' } };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(event) {
    const { passwords } = this.state;
    passwords[event.target.name] = event.target.value;
    this.setState({ passwords });
  };

  componentWillMount() {

      ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
          if (value !== this.state.passwords.password) {
              return false;
          }
          return true;
      });
  };

  handleSubmit(e) {
    e.preventDefault();

    this.props.actions.resetPassword(Object.assign({}, {token: this.props.routeParams.tokenId }, this.state.passwords));
  };

  render() {

    const { passwords } = this.state;

    return (
    <div className="row"> 
      <div className="container auth-container">
        <div className="col-md-offset-4 col-md-4 col-sm-offset-1 col-sm-10">
          
          <h4 className="bold-title"> Please choose a new password </h4>

          <ValidatorForm
              ref="form"
              onSubmit={ this.handleSubmit }
              onError={ errors => console.log(errors) }
          >
            <TextValidator
                floatingLabelText="Password"
                onChange={this.handleChange}
                name="password"
                type="password"
                validators={['required']}
                errorMessages={['this field is required']}
                value={passwords.password}
                className="form-input-field"
            />
            <TextValidator
                floatingLabelText="Repeat password"
                onChange={this.handleChange}
                name="password_confirmation"
                type="password"
                validators={['isPasswordMatch', 'required']}
                errorMessages={['password mismatch', 'this field is required']}
                value={passwords.password_confirmation}
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
  return { 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Reset);

