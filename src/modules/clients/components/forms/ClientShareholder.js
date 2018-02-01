import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ClientActions from '../../actions';
import * as UserActions from '../../../users/actions';
import FormFunctions from '../../../shared/actions/FormFunctions';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
 

class ClientShareholder extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      shareholderForm: true, 
      event: {},
      form:  { identification: {} }, 
    };
  };

  componentWillReceiveProps() {
    var { profileClientShareholder, event } = this.props;

    if (Object.keys(profileClientShareholder).length !== 0) {
      var form = Object.assign({}, profileClientShareholder);
      
      if (event.event === "edit_client_shareholder"){
        form.name = profileClientShareholder.first_name + ' ' + profileClientShareholder.last_name;
      }
      this.setState({ 
        form: form,
        event: Object.assign({}, event)
      });
    }
  }

  checkID(event, key, value) {
    var { form } = this.state;

    form.identification.id_type = value;

    this.setState({ form: form })
  }

  handleSubmitShareholder () {
    const { form, event } = this.state;
    const { profileClient, clientActions } = this.props;

    if (event.event === 'add_client_shareholder') {
      return clientActions.createClientShareholder({ profileClient: profileClient, form: form });
    } else if (event.event === 'edit_client_shareholder'){
      return clientActions.updateClientShareholder({ profileClient: profileClient, form: form });
    }
  }

  render() { 

    const { dialogs, createClientShareholderErrors } = this.props;
    const { form, event } = this.state;
    var signature_specimen = null, dialog_title = 'Shareholder';


    if (event.domain === "director") {
      if (event.event === 'add_client_shareholder'){
        dialog_title = 'Add Client Director';
      } else {
        dialog_title = 'Edit Client Director';
      }
    } else if (event.domain === "shareholder") {
      if (event.event === 'add_client_shareholder'){
        dialog_title = 'Add Client Shareholder';
      } else {
        dialog_title = 'Edit Client Shareholder';
      }
    }

    if (form.director) {
      signature_specimen = <span> 
                            <label htmlFor="signature_specimen"> Signature Specimen </label>
                            <input 
                               type="file" 
                               accept="application/pdf"
                               ref="signature_specimen"
                               name="signature_specimen"
                               onChange={ FormFunctions.handleFileChange.bind(this) }
                            />
                            { createClientShareholderErrors.signature_specimen }
                          </span>;
    }


    return (
      <span>

        <Dialog
          title={ dialog_title }
          modal={ true }
          open={ dialogs.openClientShareholderDialog }
        >

          <ValidatorForm
              ref="form"
              onSubmit={ this.handleSubmitShareholder.bind(this) }
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
                { createClientShareholderErrors.name }
              </div>
              <div className="col-md-6 col-sm-12">
                <DatePicker 
                  floatingLabelText="Date of Birth"
                  hintText="Incorporation Date" 
                  container="inline" 
                  mode="landscape"
                  name="date_of_birth"
                  value={ new Date(form.date_of_birth) }
                  onChange={ FormFunctions.handleDateChange.bind(this) }
                  textFieldStyle={{width: '100%'}}
                />
                { createClientShareholderErrors.date_of_birth }
              </div>
            </div>
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
                { createClientShareholderErrors.email }
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
                { createClientShareholderErrors.mobile_number }
              </div>
            </div>
            <div className="row flexible-row">
              <div className="col-md-6 col-sm-12">              
                  <SelectField
                    value={form.identification.id_type}
                    onChange={ this.checkID.bind(this) }
                    floatingLabelText="Identification Type"
                    floatingLabelFixed={true}
                    hintText="Identification Type"
                    className="search-input-field"
                    style={ { minWidth: 200 } } 
                  >
                    <MenuItem key='national_id' value='national_id' primaryText="National ID" />
                    <MenuItem key='passport_id' value='passport_id' primaryText="Passport ID" />
                  </SelectField>
              </div>
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText={ form.identification.id_type === "national_id" ? "National ID Number" : "Passport ID Number" }
                    onChange={ FormFunctions.handleIDChange.bind(this) }
                    name="id_number"
                    type="text"
                    validators={['isNumber', 'required']}
                    errorMessages={['ID number must be numeric', 'This field is required']}
                    value={form.identification.id_number}
                    className="search-input-field"
                />
                { createClientShareholderErrors.id_number }
              </div>
            </div>
            <div className="row flexible-row">
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Nationality"
                    onChange={ FormFunctions.handleChange.bind(this) }
                    name="nationality"
                    type="text"
                    value={form.nationality}
                    className="search-input-field"
                />
                { createClientShareholderErrors.nationality }
              </div>
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Tax Pin"
                    onChange={ FormFunctions.handleChange.bind(this) }
                    name="tax_pin"
                    type="text"
                    validators={['required']}
                    errorMessages={['This field is required']}
                    value={form.tax_pin}
                    className="search-input-field"
                />
                { createClientShareholderErrors.tax_pin }
              </div>
            </div>
            <div className="row flexible-row">
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Shares Owned"
                    onChange={ FormFunctions.handleChange.bind(this) }
                    name="shares_owned"
                    type="text"
                    validators={['isFloat', 'required']}
                    errorMessages={['Shares owned must be numeric', 'This field is required']}
                    value={form.shares_owned}
                    className="search-input-field"
                />
                { createClientShareholderErrors.shares_owned }
              </div>
              <div className="col-md-6 col-sm-12">
                  <div className="shareholder-box flexed">
                     <Checkbox
                      label="Director"
                      name="director"
                      checked= { form.director }
                      className="shareholder-checkbox"
                      onCheck={FormFunctions.handleCheck.bind(this)}
                    /> 
                     <Checkbox
                      label="Shareholder"
                      name="shareholder"
                      checked= { form.shareholder }
                      className="shareholder-checkbox"
                      onCheck={FormFunctions.handleCheck.bind(this)}
                    /> 
                  </div>
              </div>
            </div>
            <div className="row flexible-row">
              <div className="col-md-6 col-sm-12 upload-unit">              
                  { signature_specimen }
              </div>
            </div>

            <div className="modal-actions"> 

              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={ FormFunctions.handleCloseClientDialogs.bind(this) }
              />
              <FlatButton
                label="Save"
                type="submit"
                primary={ true }
              />
            </div>

          </ValidatorForm>

        </Dialog>

      </span>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    clientActions: bindActionCreators(ClientActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
  };
}

function mapStateToProps(state){
  return { 
    dialogs: state.clients.dialogs,
    user_permissions: state.users.user_permissions,
    included: state.clients.profileClientIncluded,
    createClientShareholderErrors: state.clients.createClientShareholderErrors,
    profileClient: state.clients.profileClient,
    event: state.clients.event,
    profileClientShareholder: state.clients.profileClientShareholder
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ClientShareholder);
