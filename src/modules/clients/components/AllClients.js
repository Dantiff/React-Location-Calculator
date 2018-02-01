import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ClientActions from '../actions';
import * as UserActions from '../../users/actions';
import TableFunctions from '../.././shared/actions/TableFunctions';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import { Table, Pagination, PaginationItem, PaginationLink  } from 'reactstrap';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import FormFunctions from '../.././shared/actions/FormFunctions';
import CreateClientContent from './CreateClientContent';
import RequestSuspendClientContent from './RequestSuspendClientContent';
import CheckClientContent from './CheckClientContent';
import ConfirmSuspendClientContent from './ConfirmSuspendClientContent';

var S = require('string');

class AllClients extends Component{
  constructor(props){
    super();

    this.state = { 
      filterBy: '', 
      allowedActions: [], 
      selectedClient: {}, 
      auth_permissions: {},
      open: false,
      page: 1,
      pSize: 9
    };
  }

  componentWillMount() {
    this.props.userActions.getUserPermissions(JSON.parse(localStorage.getItem("auth_user")));

    this.props.clientActions.getClients(this.state.page, this.state.pSize);

    this.props.clientActions.getAllClients();
  }

  getAllowedActions(client) {

    let auth = JSON.parse(localStorage.getItem("auth_user"));

    this.setState({selectedClient: Object.assign({}, {}, client)});

    let auth_permissions = this.state.auth_permissions;

    this.props.user_permissions.map((p) => {

      auth_permissions[p.slug] = p.status;

      return this.setState({auth_permissions: auth_permissions});

    });
    
    let allowedActions = [];

    if ( client.maker_checker_state.state === 'checker_pending' && auth_permissions.check_client ) {
      let action = { value: 'check', display: 'Approve Client' };
      allowedActions.push(action);
    }

    if ( auth.role === 'admin' || auth.role === 'operations' ) {
      let action = { value: 'view', display: 'View' };
      allowedActions.push(action);
    }

    if ( auth_permissions.suspend_client && client.maker_checker_state.state !== 'suspension_pending' && client.maker_checker_state.state !== 'suspended' ) {
      let action = { value: 'request_suspension', display: 'Request Suspension' };
      allowedActions.push(action);
    }

    if ( client.maker_checker_state.state === 'suspension_pending' && auth_permissions.check_client) {
      let action = { value: 'confirm_suspension', display: 'Confirm Suspension' };
      allowedActions.push(action);
    }

    return this.setState({allowedActions: allowedActions});

  }

  render(){
    const { clients_list, clients_full_list } = this.props;

    const { selectedClient, allowedActions } = this.state;

    var add_clients_btn = null;

    this.props.user_permissions.map((p) => {

      if (p.slug === "add_client" && p.status) {
        add_clients_btn = <FlatButton
                          label="Add Client"
                          labelStyle={{textTransform: 'capitalize', color: '#337ab7'}}
                          onTouchTap={ FormFunctions.onClientAction.bind(this, 'add', 'Client', 'Client') }
                          className="float-right"
                        />;
      }
      return add_clients_btn;
    })

    var pagination = [];
    for (var i = 0; i < clients_full_list.length/this.state.pSize; i++) {
      pagination.push(
        <PaginationItem active={ this.state.page === i+1 ? true : false }>
          <PaginationLink onClick={TableFunctions.handlePageChange.bind(this, "current", i+1, "clients")} data-page={i+1} >
            {i+1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return(
      <div className="padding-left-10">
        <div className="row"> 
            <div className="col-sm-5 col-md-5 float-left users-count-tab"> 
              <p className="users-count"> Clients | { clients_full_list.length } clients </p>
            </div>
            <div className="col-sm-5 col-md-5 float-right">
              <div className="col-sm-5 col-sm-offset-2 col-md-5 col-md-offset-2"> 
                <span className="search-users"> 
                  <ValidatorForm
                    ref="form"
                    onSubmit={() => console.log(this.state.filterBy)}
                    onError={errors => console.log(errors)}
                  >
                    <TextValidator
                      floatingLabelText="Search..."
                      name="filterBy"
                      value={this.state.filterBy}
                      onChange={TableFunctions.handleSearch.bind(this)}
                      className="search-input-field"
                    />
                  </ValidatorForm>
                </span>
              </div>
              <div className="col-sm-5 col-md-5 add-users float-right">
                { add_clients_btn }
              </div>
            </div>
        </div>
        <div className='row'>
          <Table striped id="">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Registration Number</th>
                <th>Tax ID</th>
                <th>Status</th>
                <th> </th>
              </tr>
            </thead>
            <tbody id="userTable">
              { clients_list.map((c) => { 
                return(
                  <tr>
                    <td className="capitalize">{c.attributes.name}</td>
                    <td>{c.attributes.mobile_number}</td>
                    <td>{c.attributes.registration_number}</td>
                    <td>{c.attributes.tax_id}</td>
                    <td className="capitalize">{ c.attributes.status ? S(c.attributes.status).replaceAll('_', ' ').s : '' }</td>
                    <td> 
                      <ul className="dropbtn icons vertical-icons" onTouchTap={TableFunctions.handleTouchTap.bind(this)} onClick={ this.getAllowedActions.bind(this, c.attributes) }>
                          <li></li>
                          <li></li>
                          <li></li>
                      </ul>
                    </td>

                  </tr>
                )}
              )}
            </tbody>
          </Table>

          <Pagination>
            <PaginationItem disabled={ this.state.page === 1 ? true : false }>
              <PaginationLink previous  onClick={TableFunctions.handlePageChange.bind(this, "previous", null, "clients")} />
            </PaginationItem>

            { pagination.map( (p) => { return p }) }

            <PaginationItem>
              <PaginationLink next  onClick={TableFunctions.handlePageChange.bind(this, "next", null, "clients")} />
            </PaginationItem>
          </Pagination> 

        </div>

      
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={TableFunctions.handleRequestClose.bind(this)}
          style={ {minWidth: '180px'} }
        >
          <Menu>
            {
              allowedActions.map((item) => {
                    return <MenuItem primaryText={item.display} onClick={ FormFunctions.onClientAction.bind(this, item.value) } />;
                })
            }
          </Menu>
        </Popover>


        <CreateClientContent />

        <CheckClientContent client={ selectedClient } />

        <RequestSuspendClientContent client={ selectedClient } />

        <ConfirmSuspendClientContent client={ selectedClient } />


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
  return {
    clients_list: state.clients.list,
    clients_full_list: state.clients.full_list,
    user_permissions: state.users.user_permissions,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllClients);
