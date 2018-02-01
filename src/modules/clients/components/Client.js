import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ClientActions from '../actions';
import * as UserActions from '../../users/actions';
import FormFunctions from '../.././shared/actions/FormFunctions';
import ClientContact from './forms/ClientContact';
import ClientShareholder from './forms/ClientShareholder';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Table } from 'reactstrap';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Textarea from 'muicss/lib/react/textarea';
import SignatureViewer from '../.././shared/components/SignatureViewer'

var S = require('string');

class Client extends Component {
  constructor(props){
    super();
    props.clientActions.getClient(props.params.fingerprint)

    this.state = {
      form: {},
      formChecker: {},
      locationChecker: {},
      filterBy: '',
      auth_permissions: {},
      open: false,
      page: 1,
      pSize: 9,
      slideIndex: 0,

    };
  }

  componentWillMount() {

    this.props.userActions.getUserPermissions(JSON.parse(localStorage.getItem("auth_user")));

    this.props.clientActions.getClient(this.props.params.fingerprint);

    this.props.clientActions.getAllClients();
  }

  componentWillReceiveProps () {
    if (this.props.profileClient !== undefined) {
      var form = Object.assign({}, this.props.profileClient.attributes);
      for (var i = Object.keys(form).length - 1; i >= 0; i--) {
        if (form[Object.keys(form)[i]] === null && Object.keys(form)[i] !== 'date_of_incorporation') {
          form[Object.keys(form)[i]] = '';
        }
      }
      this.setState({ form: form, formChecker: Object.assign({}, form), locationChecker: Object.assign({}, form.location) })
    }
  }

  handleTabChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  getProfileContent () {
    const { included, updateClientErrors } = this.props;

    const { form, formChecker, locationChecker } = this.state;

    console.log('profile client form', form, "included", included)

    if (this.props.profileClient !== undefined) {
      if (JSON.stringify(form) !== JSON.stringify(formChecker) || JSON.stringify(form.location) !== JSON.stringify(locationChecker)) {
        var formActions = <div className="modal-actions" style={{marginTop: 24, marginBottom: 12}}>
                          <FlatButton
                            label="Cancel"
                            primary={true}
                          />
                          <FlatButton
                            label="Save"
                            type="submit"
                            primary={true}
                          />
                        </div>;
      } else {
        formActions = null;
      }
    }

  const clientTypes = [
    <MenuItem key={'self_help_group'} value={'self_help_group'} primaryText="Self Help group" />,
    <MenuItem key={'sole_proprietor'} value={'sole_proprietor'} primaryText="Sole Proprietor" />,
    <MenuItem key={'partnership'} value={'partnership'} primaryText="Partnership" />,
    <MenuItem key={'limited_liability_client'} value={'limited_liability_client'} primaryText="Limited Liability Client" />,
  ];

    var edit_client = false;
    var add_contact,
        add_director,
        add_shareholder = null;

    this.props.user_permissions.map((p) => {

      if ((p.slug === "add_client" && p.status) || (p.slug === "edit_client" && p.status)) {
        edit_client = true;
        add_contact = <FlatButton
                        label="Add Contact"
                        style={{textTransform: 'capitalize'}}
                        onTouchTap={ FormFunctions.onClientAction.bind(this, "add_client_contact") }
                      /> ;
        add_director = <FlatButton
                        label="Add Director"
                        style={{textTransform: 'capitalize'}}
                        onTouchTap={ FormFunctions.onClientAction.bind(this, "add_client_shareholder", null, 'director') }
                      /> ;
        add_shareholder = <FlatButton
                        label="Add Shareholder"
                        style={{textTransform: 'capitalize'}}
                        onTouchTap={ FormFunctions.onClientAction.bind(this, "add_client_shareholder", null, 'shareholder') }
                      /> ;
      }
      return true;
    })

    const styles = {
      slide: {
        padding: 10,
      },
      tab: {
        color: 'black'
      },
      inkBar: {
        color: 'black',
        background: 'black'
      },
      tabItem: {
        background: 'transparent',
        color: 'black'
      }
    };


    if (Object.keys(form).length === 0) {
      var profile = null;
    }else {

      var people = [];
      var directors = [];
      var shareholders = [];

      included.map((p) => {

        if (p.type === "people") {
          people.push(p.attributes);
        }
        if (p.type === "directors") {
          if (p.attributes.director){
            directors.push(p.attributes);
          }
          if (p.attributes.shareholder){
            shareholders.push(p.attributes);
          }
        }
        return people;
      })

      profile = <span>
                  <div className="profile-basics">
                    <h2 className="capitalize"> { form.name } </h2>
                    <h4 className="capitalize"> { S(form.client_type).replaceAll('_', ' ').s } </h4>
                  </div>
                  <Divider />
                  <div>
                    <Tabs
                      onChange={ this.handleTabChange }
                      value={ this.state.slideIndex }
                      inkBarStyle={ styles.inkBar }
                      tabItemContainerStyle={ styles.tabItem }
                    >
                      <Tab style={ styles.tab } label="Basic Info" value={0} />
                      <Tab style={ styles.tab } label="Contact People" value={1} />
                      <Tab style={ styles.tab } label="Directors" value={2} />
                      <Tab style={ styles.tab } label="Shareholders" value={3} />
                    </Tabs>
                    <SwipeableViews
                      index={this.state.slideIndex}
                      onChangeIndex={this.handleChange}
                    >
                      <ValidatorForm
                          ref="form"
                          onSubmit={ FormFunctions.handleClientUpdate.bind(this) }
                          onError={errors => console.log(errors)}
                          className="profile-form"
                      >
                        <div className="row flexible-row">
                          <div className="col-md-6 col-sm-12">
                            <TextValidator
                                disabled={ true }
                                floatingLabelText="Initial Category"
                                onChange={ FormFunctions.handleChange.bind(this) }
                                name="initial_category"
                                type="text"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                value={form.initial_category}
                                className="search-input-field"
                            />
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <TextValidator
                                disabled={ true }
                                floatingLabelText="Status"
                                onChange={ FormFunctions.handleChange.bind(this) }
                                name="status"
                                type="text"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                value={form.status}
                                className="search-input-field"
                            />
                          </div>
                        </div>
                        <div className="row flexible-row">
                          <div className="col-md-6 col-sm-12">
                            <TextValidator
                                disabled={ !edit_client }
                                floatingLabelText="Name"
                                onChange={ FormFunctions.handleChange.bind(this) }
                                name="name"
                                type="text"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                value={form.name}
                                className="search-input-field"
                            />
                            { updateClientErrors.name }
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <SelectField
                              disabled={ !edit_client }
                              value={form.client_type}
                              onChange={ FormFunctions.handleClientTypeChange.bind(this) }
                              floatingLabelText="Client Type"
                              floatingLabelFixed={true}
                              hintText="Client Type"
                              className="search-input-field"
                            >
                              { clientTypes }
                            </SelectField>
                            { updateClientErrors.client_type }
                          </div>
                        </div>

                        <div className="row flexible-row">
                          <div className="col-md-6 col-sm-12">
                            <TextValidator
                                disabled={ !edit_client }
                                floatingLabelText="Registration Number"
                                onChange={ FormFunctions.handleChange.bind(this) }
                                name="registration_number"
                                type="text"
                                value={form.registration_number}
                                className="search-input-field"
                            />
                            { updateClientErrors.registration_number }
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <TextValidator
                                disabled={ !edit_client }
                                floatingLabelText="Tax ID"
                                onChange={ FormFunctions.handleChange.bind(this) }
                                name="tax_id"
                                type="text"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                value={form.tax_id}
                                className="search-input-field"
                            />
                            { updateClientErrors.tax_id }
                          </div>
                        </div>

                        <div className="row flexible-row">
                          <div className="col-md-6 col-sm-12">
                            <DatePicker
                              disabled={ !edit_client }
                              floatingLabelText="Incorporation Date"
                              hintText="Incorporation Date"
                              container="inline"
                              mode="landscape"
                              name="date_of_incorporation"
                              value={ new Date(form.date_of_incorporation) }
                              onChange={ FormFunctions.handleDateChange.bind(this) }
                              textFieldStyle={{width: '100%'}}
                            />
                            { updateClientErrors.date_of_incorporation }
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <TextValidator
                                disabled={ !edit_client }
                                floatingLabelText="Credit Limit"
                                onChange={ FormFunctions.handleChange.bind(this) }
                                name="credit_limit"
                                type="text"
                                validators={['isFloat', 'required']}
                                errorMessages={['Credit limit must be numeric', 'This field is required']}
                                value={form.credit_limit}
                                className="search-input-field"
                            />
                            { updateClientErrors.credit_limit }
                          </div>
                        </div>
                        <div className="row flexible-row">
                          <div className="col-md-6 col-sm-12">
                            <TextValidator
                                disabled={ !edit_client }
                                floatingLabelText="Email address"
                                onChange={ FormFunctions.handleChange.bind(this) }
                                name="email"
                                type="email"
                                validators={['required', 'isEmail']}
                                errorMessages={['This field is required', 'Email is not valid']}
                                value={form.email}
                                className="search-input-field"
                            />
                            { updateClientErrors.email }
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <TextValidator
                                disabled={ !edit_client }
                                floatingLabelText="Phone number"
                                onChange={ FormFunctions.handleChange.bind(this) }
                                name="mobile_number"
                                type="text"
                                validators={['isNumber', 'required']}
                                errorMessages={['Phone number must be numeric', 'This field is required']}
                                value={form.mobile_number}
                                className="search-input-field"
                            />
                            { updateClientErrors.mobile_number }
                          </div>
                        </div>

                        <div className="row flexible-row">
                          <div className="col-md-6 col-sm-12">
                            <TextValidator
                                disabled={ !edit_client }
                                floatingLabelText="PO BOX"
                                onChange={ FormFunctions.handleLocationChange.bind(this) }
                                name="pobox"
                                type="text"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                value={form.location.pobox}
                                className="search-input-field"
                            />
                            { updateClientErrors.pobox }
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <TextValidator
                                disabled={ !edit_client }
                                floatingLabelText="City"
                                onChange={ FormFunctions.handleLocationChange.bind(this) }
                                name="city"
                                type="text"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                value={form.location.city}
                                className="search-input-field"
                            />
                            { updateClientErrors.city }
                          </div>
                        </div>

                        <div className="row flexible-row">
                          <div className="col-md-6 col-sm-12">
                            <TextValidator
                                disabled={ !edit_client }
                                floatingLabelText="Country"
                                onChange={ FormFunctions.handleLocationChange.bind(this) }
                                name="country"
                                type="text"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                value={form.location.country}
                                className="search-input-field"
                            />
                            { updateClientErrors.country }
                          </div>
                          <div className="col-md-6 col-sm-12">
                            <TextValidator
                                disabled={ !edit_client }
                                floatingLabelText="Physical Location"
                                onChange={ FormFunctions.handleLocationChange.bind(this) }
                                name="physical_location"
                                type="text"
                                validators={['required']}
                                errorMessages={['This field is required']}
                                value={form.location.physical_location}
                                className="search-input-field"
                            />
                            { updateClientErrors.physical_location }
                          </div>
                        </div>
                        <div className="row flexible-row">
                          <div className="col-lg-12 col-md-6 col-sm-12">
                            <Textarea
                              disabled={ !edit_client }
                              label="Description of Goods"
                              floatingLabel={true}
                              required={true}
                              name="description_of_goods"
                              type="textarea"
                              className="search-input-field"
                              onChange={ FormFunctions.handleChange.bind(this) }
                              value={form.description_of_goods}
                             />
                            { updateClientErrors.signing_mandate }
                          </div>
                        </div>
                        <div className="row flexible-row">
                          <div className="col-lg-12 col-md-6 col-sm-12">
                            <Textarea
                              disabled={ !edit_client }
                              label="Signing Mandate"
                              floatingLabel={true}
                              required={true}
                              name="signing_mandate"
                              type="textarea"
                              className="search-input-field"
                              onChange={ FormFunctions.handleChange.bind(this) }
                              value={form.signing_mandate}
                             />
                            { updateClientErrors.signing_mandate }
                          </div>
                        </div>

                        { formActions }

                      </ValidatorForm>
                      <div className="profile-directors">
                        <div className="row">
                          <div className="col-sm-3 col-md-3 float-right">
                             { add_contact }
                          </div>
                        </div>
                        <div className="row profile-directors-box">
                          <div className="col-xs-12 col-sm-12">
                            <Table striped id="directorsTable">
                              <thead>
                                <tr>
                                  <th> Full Name </th>
                                  <th> Email </th>
                                  <th> Phone </th>
                                  <th> Department </th>
                                  <th> Authorized </th>
                                  <th>   </th>
                                </tr>
                              </thead>
                              <tbody id="tbody">
                                { people.map((p) => {

                                  return(
                                    <tr>
                                      <td className="capitalize"> { p.first_name + ' ' + p.last_name } </td>
                                      <td> { p.email } </td>
                                      <td> { p.mobile_number } </td>
                                      <td> { p.department } </td>
                                      <td className="text-center">
                                        { p.authorized_person ? <SignatureViewer url={p.signature_specimen_url} trigger='Yes'/> : <span>No</span> }
                                      </td>
                                      <td>
                                        <FlatButton
                                          label="Edit"
                                          style={{textTransform: 'capitalize'}}
                                          onTouchTap={ FormFunctions.onClientAction.bind(this, "edit_client_contact", p) }
                                        />
                                      </td>
                                    </tr>
                                  )}
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </div>
                      <div className="profile-directors">
                        <div className="row">
                          <div className="col-sm-3 col-md-3 float-right">
                            { add_director }
                          </div>
                        </div>
                        <div className="row profile-directors-box">
                          <div className="col-xs-12 col-sm-12">
                            <Table striped id="directorsTable">
                              <thead>
                                <tr>
                                  <th> Full Name </th>
                                  <th> Email </th>
                                  <th> Phone </th>
                                  <th> Signature </th>
                                  <th> Shares </th>
                                  <th>   </th>
                                </tr>
                              </thead>
                              <tbody id="tbody">
                                { directors.map((d) => {

                                  return(
                                    <tr>
                                      <td className="capitalize"> { d.first_name + ' ' + d.last_name } </td>
                                      <td> { d.email } </td>
                                      <td> { d.mobile_number } </td>
                                      <td className="text-center">
                                        { <SignatureViewer url={d.signature_specimen_url} trigger='View'/> }
                                      </td>
                                      <td> { d.shares_owned } </td>
                                      <td>
                                        <FlatButton
                                          label="Edit"
                                          style={{textTransform: 'capitalize'}}
                                          onTouchTap={ FormFunctions.onClientAction.bind(this, "edit_client_shareholder", d, 'director') }
                                        />
                                      </td>
                                    </tr>
                                  )}
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    <div className="profile-directors">
                        <div className="row">
                          <div className="col-sm-3 col-md-3 float-right">
                             { add_shareholder }
                          </div>
                        </div>
                      <div className="row profile-directors-box">
                        <div className="col-xs-12 col-sm-12">
                          <Table striped id="directorsTable">
                            <thead>
                              <tr>
                                <th> Full Name </th>
                                <th> Email </th>
                                <th> Phone </th>
                                <th> Nationality </th>
                                <th> Shares </th>
                                <th>   </th>
                              </tr>
                            </thead>
                            <tbody id="tbody">
                              { shareholders.map((s) => {

                                return(
                                  <tr>
                                    <td className="capitalize"> { s.first_name + ' ' + s.last_name } </td>
                                    <td> { s.email } </td>
                                    <td> { s.mobile_number } </td>
                                    <td> { s.nationality } </td>
                                    <td> { s.shares_owned } </td>
                                    <td>
                                      <FlatButton
                                        label="Edit"
                                        style={{textTransform: 'capitalize'}}
                                        onTouchTap={ FormFunctions.onClientAction.bind(this, "edit_client_shareholder", s, 'shareholder') }
                                      />
                                    </td>
                                  </tr>
                                )}
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                    </SwipeableViews>
                  </div>
                </span>
    }

    return (
      <span>
      { profile }

      <ClientContact />
      <ClientShareholder />
      </span>
    );
  }

  render(){

    return(
      <div className="row">
        <div className="col-xs-12">

          <Paper zDepth={2} className="profile-container">
            { this.getProfileContent() }
          </Paper>

        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clientActions: bindActionCreators(ClientActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
  };
}

function mapStateToProps(state, ownProps) {

    if (Object.keys(state.clients.profileClientIncluded).length === 0) {
      return {
        user_permissions: state.users.user_permissions,
        // profileClient: state.clients.profileClient,
        included: state.clients.profileClientIncluded,
        updateClientErrors: state.clients.updateClientErrors,
      };
    }else {
      return {
        user_permissions: state.users.user_permissions,
        profileClient: state.clients.profileClient,
        included: state.clients.profileClientIncluded,
        event: state.clients.event,
        updateClientErrors: state.clients.updateClientErrors,
      };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);
