import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../actions';
import TableFunctions from '../.././shared/actions/TableFunctions';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import { Table } from 'reactstrap';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import CreateUserContent from './CreateUserContent';
import UpdateUserContent from './UpdateUserContent';


class AllUsers extends Component{
	constructor(props){
		super();
		props.userActions.getUsers();

		this.state = { 
			filterBy: '', 
			allowedActions: [], 
			selectedUser: {}, 
			auth_permissions: {},
			open: false,
			userTabSlideIndex: 0,
		};
	}

	componentWillMount() {
		this.props.userActions.getUserPermissions(JSON.parse(localStorage.getItem("auth_user")));

		this.props.userActions.getAllPermissions();
	}

	getAllowedActions(user) {

		let auth = JSON.parse(localStorage.getItem("auth_user"));

		this.setState({selectedUser: Object.assign({}, {}, user)});

		let auth_permissions = this.state.auth_permissions;

		this.props.user_permissions.map((p) => {

			auth_permissions[p.slug] = p.status;

			return this.setState({auth_permissions: auth_permissions});

		});
		
		let allowedActions = [];

		if ( user.maker_checker_state.state === 'checker_pending' && auth_permissions.check_user ) {
			let action = { value: 'check', display: 'Approve User' };
			allowedActions.push(action);
		}

		if ( auth.role === 'admin' || auth.role === 'operations' ) {
			let action = { value: 'edit', display: 'Edit' };
			allowedActions.push(action);
		}

		if ( auth_permissions.suspend_user && user.maker_checker_state.state !== 'suspension_pending' && user.maker_checker_state.state !== 'suspended' ) {
			let action = { value: 'request_suspension', display: 'Request Suspension' };
			allowedActions.push(action);
		}

		if ( user.maker_checker_state.state === 'suspension_pending' && auth_permissions.check_user) {
			let action = { value: 'confirm_suspension', display: 'Confirm Suspension' };
			allowedActions.push(action);
		}

		return this.setState({allowedActions: allowedActions});

	}

	onAction(event) {

		this.setState({open: false});

		this.props.userActions.requestUpdateUser(event);
	}

  handleChangeUserTab = (value) => {
    this.setState({
      userTabSlideIndex: value,
    });
  }

	render(){
		const { users_list } = this.props;

		const { allowedActions } = this.state;

		var add_users_btn = null;

		this.props.user_permissions.map((p) => {

			if (p.slug === "add_user" && p.status) {
				add_users_btn = <FlatButton
                          label="Add User"
                          labelStyle={{textTransform: 'capitalize', color: '#337ab7'}}
                          onTouchTap={ this.onAction.bind(this, "add") }
                          className="float-right"
                        />;
			}
			return add_users_btn;
		})

    const styles = {
    	origin: {
    		borderBottom: 'solid 1px #cdcdcd',
    	},
      slide: {
        padding: 10,
      },
      inkBar: {
        height: 3,
  			backgroundColor: '#5f5f5f',
      },
      tabItem: {
        background: 'transparent',
        color: '#5f5f5f',
        width: '50%',
      }
    };

		return(
			<div>
				<div className="column center-column col-sm-4 col-md-4">
					<div className="column-title-box">
						<p className="column-title"> User Management </p> 
					</div>

	        <Tabs
	          onChange={this.handleChangeUserTab}
	          value={this.state.userTabSlideIndex}
            inkBarStyle={ styles.inkBar }
            tabItemContainerStyle={ styles.tabItem }
            style={ styles.origin }
	        >
	          <Tab  className="user-tab" label="Add" value={ 0 } />
	          <Tab className="user-tab" label="View" value={ 1 } />
	        </Tabs>
	        <SwipeableViews
	          index={this.state.userTabSlideIndex}
	          onChangeIndex={this.handleChangeUserTab}
	        >
	          <div>
	            <CreateUserContent />
	          </div>
	          <div>
	            slide n°2
	          </div>
        </SwipeableViews>
					
				</div>
				<div className="column last-column col-sm-8 col-md-8">
					<div className="column-title-box">
						<p className="column-title"> Registered Users </p> 
					</div>
					<div className="col-xs-12"> 
							<div className="col-sm-7 col-md-7 float-left users-count-tab"> 
								<p className="users-count"> Users | { users_list.length } users </p>
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
									{ add_users_btn }
								</div>
							</div>
					</div>
					<div className='col-xs-12'>
						<Table striped id="">
							<thead>
								<tr>
									<th>Full Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Role</th>
									<th>Status</th>
									<th> </th>
								</tr>
							</thead>
							<tbody id="userTable">
								{users_list.map((user) => {

									return(
										<tr>
											<td className="capitalize">{user.attributes.name}</td>
											<td>{user.attributes.email}</td>
											<td>{user.attributes.mobile_number}</td>
											<td>{user.attributes.role}</td>
											<td className="capitalize">{user.attributes.formatted_state}</td>
											<td> 
												<ul className="dropbtn icons vertical-icons" onTouchTap={TableFunctions.handleTouchTap.bind(this)} onClick={ this.getAllowedActions.bind(this, user.attributes) }>
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
											return <MenuItem primaryText={item.display} onClick={ this.onAction.bind(this, item.value) } />;
									})
							}
						</Menu>
					</Popover>

					<CheckUserContent user={ this.state.selectedUser } />

					<RequestSuspendUserContent user={ this.state.selectedUser } />

					<ConfirmSuspendUserContent user={ this.state.selectedUser } />

					<UpdateUserContent user={ this.state.selectedUser } />

				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		userActions: bindActionCreators(UserActions, dispatch),
	};
}

function mapStateToProps(state, ownProps) {
	return {
		users_list: state.users.list,
		user_permissions: state.users.user_permissions,
		all_permissions: state.users.all_permissions
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
