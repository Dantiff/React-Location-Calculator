import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../actions';
import FlatButton from 'material-ui/FlatButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Table } from 'reactstrap';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


class AllUsers extends Component{
	constructor(props){
		super();
		props.userActions.getUsers();

		this.state = { 
			filterBy: '', 
			userTabSlideIndex: 0,
		};
	}

	render(){
		const { usersList } = this.props;

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
	          onChange={() => console.log(this.state.userTabSlideIndex)}
	          value={this.state.userTabSlideIndex}
            inkBarStyle={ styles.inkBar }
            tabItemContainerStyle={ styles.tabItem }
            style={ styles.origin }
	        >
	          <Tab  className="user-tab" label="Add" value={ 0 } />
	          <Tab className="user-tab" label="View" value={ 1 } />
	        </Tabs>
					
				</div>
				<div className="column last-column col-sm-8 col-md-8">
					<div className="column-title-box">
						<p className="column-title"> Registered Users </p> 
					</div>
					<div className="col-xs-12"> 
							<div className="col-sm-7 col-md-7 float-left users-count-tab"> 
								<p className="users-count"> Users | { usersList.length } users </p>
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
												onChange={() => console.log(this.state.filterBy)}
												className="search-input-field"
											/>
										</ValidatorForm>
									</span>
								</div>
								<div className="col-sm-5 col-md-5 add-users float-right">
									<FlatButton
                    label="Add User"
                    labelStyle={{textTransform: 'capitalize', color: '#337ab7'}}
                    onTouchTap={ () => console.log('Begin adding a new user') }
                    className="float-right"
                  />
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
								{usersList.map((user) => {

									return(
										<tr>
											<td className="capitalize">{user.attributes.name}</td>
											<td>{user.attributes.email}</td>
											<td>{user.attributes.mobile_number}</td>
											<td>{user.attributes.role}</td>
											<td className="capitalize">{user.attributes.status}</td>
											<td> Edit </td>
										</tr>
									)}
								)}
							</tbody>
						</Table>
					</div>
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
		usersList: state.users.list,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
