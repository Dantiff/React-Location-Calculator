import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ClientActions from '../../actions';
import * as UserActions from '../../../users/actions';
import FormFunctions from '../../../shared/actions/FormFunctions';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';


class ClientContact extends Component {
    constructor(props) {
    super(props);
    this.state = { 
      form: {}, 
      event: {} 
    };
  };

  componentWillReceiveProps() {
    var { profileClientContact, event } = this.props;

    if (Object.keys(profileClientContact).length !== 0) {
      var form = Object.assign({}, profileClientContact);

      if (event.event === "edit_client_contact"){
        form.name = profileClientContact.first_name + ' ' + profileClientContact.last_name;
      }
      
      this.setState({ 
        form: form,
        event: Object.assign({}, event)
      });
    }
  };

  checkAuthority(event, key, value) {
    var { form } = this.state;

    form.authorized_person = value;

    this.setState({ form: form })
  }

  handleSubmitContact () {
    const { form, event } = this.state;
    const { profileClient, clientActions } = this.props;

    if (event.event === 'add_client_contact') {
      return clientActions.createClientContact({ profileClient: profileClient, form: form });
    } else if (event.event === 'edit_client_contact'){
      return clientActions.updateClientContact({ profileClient: profileClient, form: form });
    }
  }

  render() {

    const { dialogs, createClientContactErrors } = this.props;
    const { form, event } = this.state;
    var signature_specimen = null;

    if (form.authorized_person) {
      signature_specimen = <span> 
                            <label htmlFor="signature_specimen"> Signature Specimen </label>
                            <input 
                               type="file" 
                               accept="application/pdf"
                               ref="signature_specimen"
                               name="signature_specimen"
                               onChange={ FormFunctions.handleFileChange.bind(this) }
                            />
                            { createClientContactErrors.signature_specimen }
                          </span>;
    }

    return (
      <span>

        <Dialog
          title={ event.event === 'edit_client_contact' ? 'Edit Contact Person' : 'Add Contact Person' }
          modal={ true }
          open={ dialogs.openClientContactDialog }
        >

          <ValidatorForm
              ref="form"
              onSubmit={ this.handleSubmitContact.bind(this) }
              onError={errors => console.log(errors)}
              className="profile-form"
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
                { createClientContactErrors.name }
              </div>
              <div className="col-md-6 col-sm-12">
                <TextValidator
                    floatingLabelText="Department"
                    onChange={ FormFunctions.handleChange.bind(this) }
                    name="department"
                    type="text"
                    value={form.department}
                    className="search-input-field"
                />
                { createClientContactErrors.client_type }
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
                { createClientContactErrors.email }
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
                { createClientContactErrors.mobile_number }
              </div>
            </div>
            <div className="row flexible-row">
              <div className="col-md-6 col-sm-12">
                  <SelectField
                    value={form.authorized_person}
                    onChange={ this.checkAuthority.bind(this) }
                    floatingLabelText="Authorized Person"
                    floatingLabelFixed={true}
                    hintText="Authorized Person"
                    className="search-input-field"
                    style={ { minWidth: 200 } }
                  >
                    <MenuItem key={ false } value={ false } primaryText="No" />
                    <MenuItem key={ true } value={ true } primaryText="Yes" />
                  </SelectField>
              </div>
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
    profileClientContact: state.clients.profileClientContact,
    included: state.clients.profileClientIncluded,
    event: state.clients.event,
    createClientContactErrors: state.clients.createClientContactErrors,
    profileClient: state.clients.profileClient,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ClientContact);
