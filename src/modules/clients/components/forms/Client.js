import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ClientActions from '../../actions';
import moment from 'moment';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import FormFunctions from '../../../shared/actions/FormFunctions';

class Client extends Component {
  constructor(props) {
    super(props);  

    this.state = { 
      form: { 
        initial_category: '',
        name: '', 
        client_type: 'partnership',
        date_of_incorporation: new moment()._d,
        registration_number: '',
        tax_id: '',
        credit_limit: '',
        mobile_number: '', 
        email: '',
        location: {
          pobox: '',
          city: '',
          country: '',
          physical_location: ''
        }, 
        people: [{
          name: '',
          email: '',
          mobile_number: ''
        }] 
      }
    };

  }

  render () {

  const { stepIndex, formActions, createClientErrors, clientTypes } = this.props;

  const { form } = this.state;

  switch (stepIndex) {
    case 0:
      return (
          <ValidatorForm
              ref="form"
              onSubmit={ FormFunctions.handleClientCreate.bind(this) }
              onError={errors => console.log(errors)}
          >
            <div className="row flexible-row">
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Name"
                    onChange={ FormFunctions.handleChange.bind(this) }
                    name="name"
                    type="text"
                    validators={['required']}
                    errorMessages={['This field is required']}
                    value={form.name}
                    className="search-input-field"
                />
                { createClientErrors.name }
              </div>
              <div className="col-md-6 col-sm-12">
                <SelectField
                  value={form.client_type}
                  onChange={ FormFunctions.handleClientTypeChange.bind(this) }
                  floatingLabelText="Client Type"
                  floatingLabelFixed={true}
                  hintText="Client Type"
                  className="search-input-field"
                >
                  { clientTypes }
                </SelectField>
                { createClientErrors.client_type }
              </div>
            </div>

            <div className="row flexible-row">
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Registration Number"
                    onChange={ FormFunctions.handleChange.bind(this) }
                    name="registration_number"
                    type="text"
                    value={form.registration_number}
                    className="search-input-field"
                />
                { createClientErrors.registration_number }
              </div>
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Tax ID"
                    onChange={ FormFunctions.handleChange.bind(this) }
                    name="tax_id"
                    type="text"
                    validators={['required']}
                    errorMessages={['This field is required']}
                    value={form.tax_id}
                    className="search-input-field"
                />
                { createClientErrors.tax_id }
              </div>
            </div>

            <div className="row flexible-row">
              <div className="col-md-6 col-sm-12">
                <DatePicker 
                  floatingLabelText="Incorporation Date"
                  hintText="Incorporation Date" 
                  container="inline" 
                  mode="landscape"
                  name="date_of_incorporation"
                  value={form.date_of_incorporation}
                  onChange={ FormFunctions.handleDateChange.bind(this) }
                  textFieldStyle={{width: '100%'}}
                />
                { createClientErrors.date_of_incorporation }
              </div>
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Credit Limit"
                    onChange={ FormFunctions.handleChange.bind(this) }
                    name="credit_limit"
                    type="text"
                    validators={['isFloat', 'required']}
                    errorMessages={['Credit limit must be numeric', 'This field is required']}
                    value={form.credit_limit}
                    className="search-input-field"
                />
                { createClientErrors.credit_limit }
              </div>
            </div>

            { formActions }

          </ValidatorForm>
      );
    case 1:
      return (
          <ValidatorForm
              ref="form"
              onSubmit={ FormFunctions.handleClientCreate.bind(this) }
              onError={errors => console.log(errors)}
          >
            <div className="row flexible-row">
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Email address"
                    onChange={ FormFunctions.handleChange.bind(this) }
                    name="email"
                    type="email"
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required', 'Email is not valid']}
                    value={form.email}
                    className="search-input-field"
                />
                { createClientErrors.email }
              </div>
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Phone number"
                    onChange={ FormFunctions.handleChange.bind(this) }
                    name="mobile_number"
                    type="text"
                    validators={['isNumber', 'required']}
                    errorMessages={['Phone number must be numeric', 'This field is required']}
                    value={form.mobile_number}
                    className="search-input-field"
                />
                { createClientErrors.mobile_number }
              </div>
            </div>

            <div className="row flexible-row">
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="PO BOX"
                    onChange={ FormFunctions.handleLocationChange.bind(this) }
                    name="pobox"
                    type="text"
                    validators={['required']}
                    errorMessages={['This field is required']}
                    value={form.location.pobox}
                    className="search-input-field"
                />
                { createClientErrors.pobox }
              </div>
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="City"
                    onChange={ FormFunctions.handleLocationChange.bind(this) }
                    name="city"
                    type="text"
                    validators={['required']}
                    errorMessages={['This field is required']}
                    value={form.location.city}
                    className="search-input-field"
                />
                { createClientErrors.city }
              </div>
            </div>

            <div className="row flexible-row">
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Country"
                    onChange={ FormFunctions.handleLocationChange.bind(this) }
                    name="country"
                    type="text"
                    validators={['required']}
                    errorMessages={['This field is required']}
                    value={form.location.country}
                    className="search-input-field"
                />
                { createClientErrors.country }
              </div>
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Physical Location"
                    onChange={ FormFunctions.handleLocationChange.bind(this) }
                    name="physical_location"
                    type="text"
                    validators={['required']}
                    errorMessages={['This field is required']}
                    value={form.location.physical_location}
                    className="search-input-field"
                />
                { createClientErrors.physical_location }
              </div>
            </div>

            { formActions }

          </ValidatorForm>
      );
    case 2:

      var peopleError = {};
      if(createClientErrors.people !== undefined) {
        peopleError = createClientErrors.people;
      }
      return (
          <ValidatorForm
              ref="form"
              onSubmit={ FormFunctions.handleClientCreate.bind(this) }
              onError={errors => console.log(errors)}
          >
            <div className="row flexible-row">
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Full name"
                    onChange={ FormFunctions.handlePeopleChange.bind(this) }
                    name="name"
                    type="text"
                    validators={['required']}
                    errorMessages={['This field is required']}
                    value={form.people[0].name}
                    className="search-input-field"
                />
                { peopleError.name }
              </div>
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Phone number"
                    onChange={ FormFunctions.handlePeopleChange.bind(this) }
                    name="mobile_number"
                    type="text"
                    validators={['isNumber', 'required']}
                    errorMessages={['Phone number must be numeric', 'This field is required']}
                    value={form.people[0].mobile_number}
                    className="search-input-field"
                />
                { peopleError.mobile_number }
              </div>
            </div>
            <div className="row flexible-row">
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Email address"
                    onChange={ FormFunctions.handlePeopleChange.bind(this) }
                    name="email"
                    type="email"
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required', 'Email is not valid']}
                    value={form.people[0].email}
                    className="search-input-field"
                />
                { peopleError.email }
              </div>
            </div>

            { formActions }

          </ValidatorForm>
      );
    default:
      return 'You\'re a long way from home brah!';
  }
  }
};

Client.propTypes = { };

function mapDispatchToProps(dispatch) {
  return {
    clientActions: bindActionCreators(ClientActions, dispatch)
  };
}

function mapStateToProps(state){
  return { 
    event: state.clients.event,
    dialogs: state.clients.dialogs,
    step: state.clients.step,
    createClientErrors: state.clients.createClientErrors
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Client);