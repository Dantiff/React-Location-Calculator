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
				<div className="container container-fluid">
					<div className="row location-row location-input">
						<div className="col-xs-12 col-sm-3">
							<div className="input-title">
								<p className=""> Labor Type </p> 
							</div>
						</div>
						<div className="col-xs-12 col-sm-3">
							<div className="input-title">
								<p className=""> Labor Type </p> 
							</div>
						</div>
						<div className="col-xs-12 col-sm-3">
							<div className="input-title">
								<p className=""> Labor Type </p> 
							</div>
						</div>
						<div className="col-xs-12 col-sm-3">
							<div className="input-title">
								<p className=""> Labor Type </p> 
							</div>
						</div>
					</div>
					<div className="row location-row location-grid">
						<div className="col-xs-12">
							<div className="grid-title">
								<p className=""> Comparison #1: GridMarX </p> 
							</div>
						</div>
						<div className="col-xs-12">
							<div className="grid-detail">
								<p className=""> Overall Material and Labour Savings </p> 
							</div>
						</div>
						<div className="col-xs-6">
							<div className="grid-savings">
								<p className=""> 25.25% </p> 
							</div>
						</div>
						<div className="col-xs-6">
							<div className="grid-savings">
								<p className=""> 25.5% </p> 
							</div>
						</div>
						<div className="col-xs-12 col-sm-6">
							<div className="grid-data-box">
								<p className=""> Grid data box </p> 
							</div>
						</div>
						<div className="col-xs-12 col-sm-6">
							<div className="grid-data-box">
								<p className=""> Grid data box </p> 
							</div>
						</div>
						<div className="col-xs-12 col-sm-6">
							<div className="grid-data-box">
								<p className=""> Grid data box </p> 
							</div>
						</div>
						<div className="col-xs-12 col-sm-6">
							<div className="grid-data-box">
								<p className=""> Grid data box </p> 
							</div>
						</div>
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
