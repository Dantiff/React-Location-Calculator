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
		console.log('this is the retun Component data', locationData);

		return(
			<div className="calculator-index">
				<div className="container container-fluid">
					<div className="row location-row location-input">
						<div className="col-xs-12 col-sm-3">
							<div className="input-title">
								<p className=""> Labor Type </p> 
							</div>
							<input type="checkbox" checked data-toggle="toggle" data-on="Union" data-off="Non-Union" data-style="ios" data-size="large"/>
						</div>
						<div className="col-xs-12 col-sm-3">
							<div className="input-title">
								<p className=""> Zip Code (First 3 Digits): </p> 
							</div>
							<div className="input-group input-group-lg">
							  <input type="text" className="form-control" placeholder="" />
							</div>
						</div>
						<div className="col-xs-12 col-sm-3">
							<div className="input-title">
								<p className=""> Square Footage: </p> 
							</div>
							<div className="input-group input-group-lg">
							  <input type="text" className="form-control" placeholder="" />
							</div>
						</div>
						<div className="input-submit col-xs-12 col-sm-3">
							<div className="btn-group btn-group-justified" role="group" aria-label="...">
  							<div className="btn-group" role="group">
									<button type="button" className="btn btn-primary btn-lg"> Calculate </button>
								</div> 
							</div>
							<div className="input-text">
								<p> Location: National Avarage </p>
							</div>
						</div>
					</div>
					<div className={ 'row location-row location-grid pa-0 ' + 'theme-red'}>
						<div className="col-xs-12 pa-0">
							<div className="grid-title">
								<p className=""> Comparison #1: GridMarX </p> 
							</div>
						</div>
						<div className="col-xs-12 pa-0">
							<div className="grid-detail">
								<p className=""> Overall Material and Labour Savings </p> 
							</div>
						</div>
						<div className="col-xs-6 pa-0">
							<div className="grid-savings">
								<p className="save"> Cost Savings </p> 
								<p className="amount"> 84.6% </p> 
							</div>
						</div>
						<div className="col-xs-6 pa-0">
							<div className="grid-savings">
								<p className="save"> % Savings </p> 
								<p className="amount"> 25.5% </p> 
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 pa-0 grid-data">
							<div className="grid-data-box">
								<div className="data-title">
									Screws
								</div>
							  <div className="card-body">
							    <h5 className="card-title">Card title</h5>
							    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							    <a href="#" className="btn btn-primary">Go somewhere</a>
							  </div>
								<div className="data-footer">
									<p className="grid-detail ma-0">
										Overall labour savings (% / cost)
									</p>
									<div className="d-flex">
										<div className="grid-savings">
											<p className="amount"> 84.6% </p> 
										</div>
										<div className="grid-savings"> 
											<p className="amount"> 25.5% </p> 
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 pa-0 grid-data">
							<div className="grid-data-box">
								<p className=""> Grid data box </p> 
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 pa-0 grid-data">
							<div className="grid-data-box">
								<p className=""> Grid data box </p> 
							</div>
						</div>
						<div className="col-xs-12 col-sm-6 pa-0 grid-data">
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
