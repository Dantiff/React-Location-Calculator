import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class CreateUserContent extends Component {
  constructor(props) {
    super(props);

    this.state = { auth: { name: '', mobile_number: '', email: '', role: 'operations',  permissions: {} } };

    this.handleChange = this.handleChange.bind(this);

    this.handleRoleChange = this.handleRoleChange.bind(this);

    this.handleCheck = this.handleCheck.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.userActions.getAllPermissions();
  }

  handleCloseCreateUserDialog () {
    this.props.userActions.cancelUpdateUser();
  };

  handleChange(event) {
    const field = event.target.name;

    const auth = this.state.auth;

    auth[field] = event.target.value;

    return this.setState({auth: auth});
  }

  handleRoleChange (event, index, value) {

    const auth = this.state.auth;

    auth['role'] = value;

    return this.setState({auth: auth});
  }

  handleCheck (permission) {

    const p_slug = permission.slug;

    const auth = this.state.auth;

    let all_permissions = this.props.all_permissions;

    if (Object.keys(auth.permissions).length === 0) {
      
      all_permissions.map((p) => {

        auth.permissions[p.slug] = p.status;

        return this.setState({auth: auth});

      })
    }

    auth.permissions[p_slug] = auth.permissions[p_slug] ? false : true;

    return this.setState({auth: auth});
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.userActions.addUser({ user: this.state.auth });
  }

  render() {

    const { auth } = this.state;

    const { dialogs, all_permissions, createUserErrors } = this.props;

    const items = [
      <MenuItem key={'operations'} value={'operations'} primaryText="Operations" />,
      <MenuItem key={'admin'} value={'admin'} primaryText="Administrator" />,
      <MenuItem key={'credit'} value={'credit'} primaryText="Credit" />,
    ];

    var checks = null;

    if (all_permissions.length > 0) {

      checks = all_permissions.map( (permission) => { 
        return <Checkbox
                label={ permission.name }
                name={ permission.slug }
                checked= { this.state.auth.permissions[permission.slug] }
                className="permissions-checkbox"
                onCheck={this.handleCheck.bind(this, permission)}
              />;
       });

    }

    return (
      <div>
        <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
        >
          <div className="row flexible-row">
            <div className="col-md-6 col-sm-6">
              <TextValidator
                  floatingLabelText="Full name"
                  onChange={this.handleChange}
                  name="name"
                  type="text"
                  validators={['required']}
                  errorMessages={['This field is required']}
                  value={auth.name}
                  className="search-input-field"
              />
              { createUserErrors.name }
            </div>
            <div className="col-md-6 col-sm-6">
              <TextValidator
                  floatingLabelText="Phone number"
                  onChange={this.handleChange}
                  name="mobile_number"
                  type="text"
                  validators={['isNumber', 'required']}
                  errorMessages={['Phone number must be numeric', 'This field is required']}
                  value={auth.mobile_number}
                  className="search-input-field"
              />
              { createUserErrors.mobile_number }
            </div>
          </div>
          <div className="row flexible-row">
            <div className="col-md-6 col-sm-6">
              <TextValidator
                  floatingLabelText="Email address"
                  onChange={this.handleChange}
                  name="email"
                  type="email"
                  validators={['required', 'isEmail']}
                  errorMessages={['This field is required', 'Email is not valid']}
                  value={auth.email}
                  className="search-input-field"
              />
              { createUserErrors.email }
            </div>
            <div className="col-md-6 col-sm-6">
              <SelectField
                value={auth.role}
                onChange={this.handleRoleChange}
                floatingLabelText="Role"
                floatingLabelFixed={true}
                hintText="Role"
                className="search-input-field"
              >
                {items}
              </SelectField>
              { createUserErrors.role }
            </div>
          </div>

          <div className="permissions-box flexed">
            
            { checks }

          </div>

          <div className="modal-actions"> 

            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={ this.handleCloseCreateUserDialog.bind(this) }
            />
            <FlatButton
              label="Save"
              type="submit"
              primary={true}
            />
          </div>

        </ValidatorForm>
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
  return { 
    all_permissions: state.users.all_permissions,
    dialogs: state.users.dialogs,
    createUserErrors: state.users.createUserErrors
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateUserContent);

