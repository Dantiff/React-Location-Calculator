import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../actions';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';

class UpdateUserContent extends Component {
    constructor(props) {
    super(props);
    this.state = { selectedUser: {} };
  };

  componentWillReceiveProps() {

    const selectedUser = this.state.selectedUser;

    selectedUser.name = this.props.user.name;
    selectedUser.email = this.props.user.email;
    selectedUser.mobile_number = this.props.user.mobile_number;
    selectedUser.role = this.props.user.role;
    selectedUser.fingerprint = this.props.user.fingerprint;

    let permissions = selectedUser.permissions = {};

    let user_permissions = this.props.user.permissions;

    if (Object.keys(permissions).length === 0) {
     
     if (user_permissions !== undefined) {

      user_permissions.map((p) => {

        selectedUser.permissions[p.slug] = p.status;

        return this.setState({selectedUser: selectedUser});

      });

     }
    };

    this.setState({selectedUser: selectedUser});
  };

  handleCloseUpdateUserDialog () {
    this.props.userActions.cancelUpdateUser();
  };

  handleSubmitUpdatedUser(e) {
    e.preventDefault();

    this.props.userActions.updateUser({ user: this.state.selectedUser });
  };

  handleChange(event) {
    const field = event.target.name;

    const selectedUser = this.state.selectedUser;

    selectedUser[field] = event.target.value;

    return this.setState({selectedUser: selectedUser});
  };

  handleCheck (permission) {

    const p_slug = permission.slug;

    const selectedUser = this.state.selectedUser;

    selectedUser.permissions[p_slug] = selectedUser.permissions[p_slug] ? false : true;

    return this.setState({selectedUser: selectedUser});
  }

  handleRoleChange (event, index, value) {

    const selectedUser = this.state.selectedUser;

    selectedUser['role'] = value;

    return this.setState({selectedUser: selectedUser});
  }


  render() { 

    const { user, dialogs, updateUserErrors } = this.props;

    const { selectedUser } = this.state;

    const items = [
      <MenuItem key={'operations'} value={'operations'} primaryText="Operations" />,
      <MenuItem key={'admin'} value={'admin'} primaryText="Administrator" />,
      <MenuItem key={'credit'} value={'credit'} primaryText="Credit" />,
    ];

    var checks = null;

    if (user.permissions !== undefined) {

      checks = user.permissions.map( (permission) => { 
        return <Checkbox
                label={ permission.name }
                name={ permission.slug }
                checked= { selectedUser.permissions[permission.slug] }
                className="permissions-checkbox"
                onCheck={this.handleCheck.bind(this, permission)}
              />; 
       });

    }
    
    return (
      <span>

        <Dialog
          title="Edit User Account"
          modal={true}
          open={ dialogs.openUpdateUserDialog }
        >

          <p className="instructions-message">Enter the details below to edit user account </p>

          <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmitUpdatedUser.bind(this)}
              onError={errors => console.log(errors)}
          >
            <div className="row flexible-row">
              <div className="col-md-6 col-sm-6">
                <TextValidator
                    floatingLabelText="Full name"
                    onChange={this.handleChange.bind(this)}
                    name="name"
                    type="text"
                    validators={['required']}
                    errorMessages={['This field is required']}
                    value={selectedUser.name}
                    className="search-input-field"
                />
                { updateUserErrors.name }
              </div>
              <div className="col-md-6 col-sm-6">
                <TextValidator
                    floatingLabelText="Phone number"
                    onChange={this.handleChange.bind(this)}
                    name="mobile_number"
                    type="text"
                    validators={['required']}
                    errorMessages={['This field is required']}
                    value={selectedUser.mobile_number}
                    className="search-input-field"
                />
                { updateUserErrors.mobile_number }
              </div>
            </div>
            <div className="row flexible-row">
              <div className="col-md-6 col-sm-6">
                <TextValidator
                    floatingLabelText="Email address"
                    onChange={this.handleChange.bind(this)}
                    name="email"
                    type="email"
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required', 'Email is not valid']}
                    value={selectedUser.email}
                    className="search-input-field"
                />
                { updateUserErrors.email }
              </div>
              <div className="col-md-6 col-sm-6">
                <SelectField
                  value={selectedUser.role}
                  onChange={this.handleRoleChange.bind(this)}
                  floatingLabelText="Role"
                  floatingLabelFixed={true}
                  hintText="Role"
                  className="search-input-field"
                >
                  { items }
                </SelectField>
                { updateUserErrors.role }
              </div>
            </div>

            <div className="permissions-box flexed">
                
                { checks }

            </div>

            <div className="modal-actions"> 

              <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={ this.handleCloseUpdateUserDialog.bind(this) }
              />
              <FlatButton
                label="Save"
                type="submit"
                primary={true}
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
    userActions: bindActionCreators(userActions, dispatch)
  };
}

function mapStateToProps(state){
  return { 
    dialogs: state.users.dialogs,
    updateUserErrors: state.users.updateUserErrors 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateUserContent);
