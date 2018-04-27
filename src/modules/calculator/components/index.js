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
  	this.props.cActions.calculateLocation({ ...this.state, union: this.refs.unionCheck.checked });
  }
  getGridDataBox(data, index) {
  	return (
			<div className="col-xs-12 col-sm-6 pa-0 grid-data">
				<div className="grid-data-box">
					<div className="data-title">
						{ data.title }
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
			            <td> { data.ngc1 } </td>
			            <td> { data.ngc2 } </td>
			          </tr>
			          <tr>
			            <td> { data.cmp1 } </td>
			            <td> { data.cmp2 } </td>
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
								<p className="amount"> { data.save1 } </p> 
							</div>
							<div className="grid-savings"> 
								<p className="amount">  { data.cmp2 } </p> 
							</div>
						</div>
					</div>
				</div>
			</div>
		);
  }
  getGrid(data, grid, num) {
  	if (!data) {
  		return (<span></span>);
  	}
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

				{ 
					this.getGridDataBox({
						title: 'Labour',
						ngc1: data.national_gypsum.labor_cost_per_square_foot,
						ngc2: data.national_gypsum.extended_labor_cost,
						cmp1: data.competitor.labor_cost_per_square_foot,
						cmp2: data.competitor.extended_labor_cost,
						phrase: 'labour',
						save1: data.total_savings.labor_cost_per_square_foot_percentage,
						save2: data.total_savings.extended_labor_cost,
					})
				}
				{ 
					this.getGridDataBox({
						title: 'Screws',
						ngc1: data.national_gypsum.average_total_screws,
						ngc2: data.national_gypsum.extended_screw_cost,
						cmp1: data.competitor.average_total_screws,
						cmp2: data.competitor.extended_screw_cost,
						phrase: 'labour',
						save1: data.total_savings.average_total_screws_percentage,
						save2: data.total_savings.extended_screw_cost,
					})
				}
				{  
					this.getGridDataBox({
						title: 'Sports Fasteners Labour',
						ngc1: data.national_gypsum.spot_fastener_labor_cost_per_square_foot,
						ngc2: data.national_gypsum.spot_fastener_extended_labor_cost,
						cmp1: data.competitor.spot_fastener_labor_cost_per_square_foot,
						cmp2: data.competitor.spot_fastener_extended_labor_cost,
						phrase: 'labour',
						save1: data.total_savings.spot_fastener_labor_cost_per_square_foot_percentage,
						save2: data.total_savings.spot_fastener_extended_labor_cost,
					})
				}
				{  
					this.getGridDataBox({
						title: 'Sports Fasteners Material',
						ngc1: data.national_gypsum.spot_fastener_material_cost_per_square_foot,
						ngc2: data.national_gypsum.spot_fastener_extended_material_cost,
						cmp1: data.competitor.spot_fastener_material_cost_per_square_foot,
						cmp2: data.competitor.spot_fastener_extended_material_cost,
						phrase: 'labour',
						save1: data.total_savings.spot_fastener_material_cost_per_square_foot_percentage,
						save2: data.total_savings.spot_fastener_extended_material_cost,
					}) 
				}

			</div>
		);
}

	render(){
		const { locationData } = this.props;

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
