import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as cActions from '../actions';
import FlatButton from 'material-ui/FlatButton';
import { Table } from 'reactstrap';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


class LocationCalculator extends Component{
	constructor(props){
		super();
		props.cActions.calculateLocation();

		this.state = { 
			filterBy: '', 
			userTabSlideIndex: 0,
		};
	}
  //Search html tables using javascript
  handleSearch(event) {
    
    var input, filter, table, tr, td, i;

    input  = event.target.value;

    this.setState({filterBy: input});

    filter = input.toUpperCase();
    table = document.getElementById("userTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].innerHTML;
      if (td) {
        if (td.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

	render(){
		const { locationData } = this.props;
		const usersList = [];
		console.log('this is the retun Component data', locationData);

		return(
			<div className="calculator-index">
				<div className="column last-column col-xs-12">
					<div className="column-title-box">
						<p className="column-title"> User Management </p> 
					</div>
					<div className='col-xs-12'>
						<Table striped id="">
							<thead>
								<tr>
									<th>Full Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Role</th>
									<th> </th>
								</tr>
							</thead>
							<tbody id="userTable">
								{usersList.map((user, i) => {

									return(
										<tr key={i}>
											<td className="capitalize">{user.attributes.first_name + ' ' + user.attributes.last_name}</td>
											<td>{user.attributes.email}</td>
											<td>{user.attributes.mobile_number}</td>
											<td>{user.attributes.role}</td>
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
		cActions: bindActionCreators(cActions, dispatch),
	};
}

function mapStateToProps(state, ownProps) {
	return {
		locationData: state.calculator.locationData,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationCalculator);
