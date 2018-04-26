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
			calculator_type: 'gold_bond', 
			union: true,
			location: '',
			square_footage: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}
  handleChange(event) {
  	if (!isNaN(event.target.value)) {
	    this.setState({
	      [event.target.name]: event.target.value
	    });
	  }
  }
  handleCalculate() {
  	console.log('The submit data', { ...this.state, union: this.refs.unionCheck.checked });
  	this.props.cActions.calculateLocation({ ...this.state, union: this.refs.unionCheck.checked });
  }
  getGridDataBox(data, index) {
  	return (
			<div className="col-xs-12 col-sm-6 pa-0 grid-data">
				<div className="grid-data-box">
					<div className="data-title">
						Screws
					</div>
				  <div className="data-table">
			      <Table>
			      	<div className="row-title-one"> NGC GRidMax </div>
			      	<div className="row-title-two"> COMPETITOR </div>
			        <thead>
			          <tr>
			            <th>Labour Cost/SF</th>
			            <th>Ext. Labour Cost</th>
			          </tr>
			        </thead>
			        <tbody>
			          <tr>
			            <td>$0.235</td>
			            <td>$0.214</td>
			          </tr>
			          <tr>
			            <td>$1.25</td>
			            <td>$5.28</td>
			          </tr>
			        </tbody>
			      </Table>
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
		);
  }
  getGrid(data, grid, num) {
  	return (
			<div className={ 'row location-row location-grid pa-0 ' + (num === 1 ? 'theme-red' : 'theme-gold')}>
				<div className="col-xs-12 pa-0">
					<div className="grid-title">
						<p className=""> Comparison #{num}: GridMarX (12/12) vs Leading Competitor (8/12)</p> 
					</div>
				</div>
				<div className="col-xs-12 pa-0">
					<div className="grid-detail">
						<p className=""> Overall Material and Labour Savings { grid } </p> 
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

				{ this.getGridDataBox() }
				{ this.getGridDataBox() }
				{ this.getGridDataBox() }
				{ this.getGridDataBox() }

			</div>
		);
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
							<input 
								type="checkbox" 
								data-toggle="toggle" 
								data-on="Union" 
								data-off="Non-Union" 
								data-style="ios" 
								data-size="large"
								ref="unionCheck"
								checked={this.state.union}
							/>
						</div>
						<div className="col-xs-12 col-sm-3">
							<div className="input-title">
								<p className=""> Zip Code (First 3 Digits): </p> 
							</div>
							<div className="input-group input-group-lg">
							  <input 
							  	type="text" 
							  	name="location"
							  	className="form-control" 
							  	placeholder="" 
							  	value={this.state.location}
									onChange={this.handleChange}
							  />
							</div>
						</div>
						<div className="col-xs-12 col-sm-3">
							<div className="input-title">
								<p className=""> Square Footage: </p> 
							</div>
							<div className="input-group input-group-lg">
							  <input 
							  	type="text" 
							  	className="form-control" 
							  	placeholder="" 
							  	name="square_footage"
							  	value={this.state.square_footage}
									onChange={this.handleChange}
							  />
							</div>
						</div>
						<div className="input-submit col-xs-12 col-sm-3">
							<div className="btn-group btn-group-justified" role="group" aria-label="...">
  							<div className="btn-group" role="group">
									<button type="button" className="btn btn-primary btn-lg" onClick={this.handleCalculate.bind(this)}> Calculate </button>
								</div> 
							</div>
							<div className="input-text">
								<p> Location: National Avarage </p>
							</div>
						</div>
					</div>

					{ this.getGrid(locationData.vertical, 'Vertical', 1) }
					{ this.getGrid(locationData.horizontal, 'Horizontal', 2) }

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
