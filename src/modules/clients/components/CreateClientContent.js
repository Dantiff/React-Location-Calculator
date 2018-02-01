import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ClientActions from '../actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

//Forms
import Client from './forms/Client';
import Supplier from './forms/Supplier';


class CreateClientContent extends Component {
  constructor(props) {
    super(props);

    this.state = { };

  }

  getStepContent (stepIndex) {

    var { createClientErrors, event } = this.props;

    var stepLimit = 0;

    if (event.alias === "Client") {
      stepLimit = 2;
    } else if (event.alias === "Supplier") {
      stepLimit = 3;
    } 

    const formActions = <div className="modal-actions" style={{marginTop: 24, marginBottom: 12}}>
                          <FlatButton
                            label="Cancel"
                            primary={true}
                            onTouchTap={ () => { this.props.clientActions.cancelUpdateClient() } }
                          />
                          <FlatButton
                            label="Back"
                            disabled={stepIndex === 0}
                            onTouchTap={ () => { this.props.clientActions.previousStep() }}
                            style={{marginRight: 12}}
                          />
                          <FlatButton
                            label={stepIndex === stepLimit ? 'Finish' : 'Next'}
                            type="submit"
                            primary={true}
                          />
                        </div>;

    const clientTypes = [
      <MenuItem key={'self_help_group'} value={'self_help_group'} primaryText="Self Help group" />,
      <MenuItem key={'sole_proprietor'} value={'sole_proprietor'} primaryText="Sole Proprietor" />,
      <MenuItem key={'partnership'} value={'partnership'} primaryText="Partnership" />,
      <MenuItem key={'limited_liability_client'} value={'limited_liability_client'} primaryText="Limited Liability Client" />,
    ];
                   
    
    if (event.alias === "Client") {
      return <Client 
                stepIndex={ stepIndex } 
                formActions={ formActions } 
                createClientErrors={ createClientErrors }
                clientTypes={ clientTypes }
              />
    } else if (event.alias === "Supplier") {
      return <Supplier 
                stepIndex={ stepIndex } 
                formActions={ formActions } 
                createClientErrors={ createClientErrors }
                clientTypes={ clientTypes }
              />
    }
  }

  renderContent() {
    const { step, event } = this.props;
    const contentStyle = {margin: '0 16px', overflow: 'hidden'};

    if (step.stepFinished) {
      return (
        <div style={contentStyle}>
          <div className="reset-success-icon">
            <p className="reset-icon-box"> <i className="fa fa-check fa-3x reset-icon color-white"></i> </p>
          </div>
          <h3 className="reset-message">You have successfully created new { event.alias } </h3>

              <div className="modal-actions" style={{marginTop: 24, marginBottom: 12}}>
                <FlatButton
                  label="Close"
                  primary={true}
                  onTouchTap={ () => { this.props.clientActions.cancelUpdateClient() } }
                />
              </div>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(step.stepIndex)}</div>
      </div>
    );
  }

  render() {

    const { event, dialogs, step } = this.props;

    console.log("the received event", event, "the step", step)

    let loader_div = null;

    if(step.stepLoader){
      loader_div = <span>
                    <div className="load-container"> </div>
                    <div className="loader"> 
                      <CircularProgress size={60} thickness={5} color="#fff"/> 
                    </div>
                  </span>;
    }

    let steps = null;

    if (event.alias === "Client") {
      steps = <Stepper className="col-sm-12 col-md-12" activeStep={step.stepIndex}>
                <Step>
                  <StepLabel>Basic Info</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Contact Info</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Contact Person</StepLabel>
                </Step>
              </Stepper>
    } else if (event.alias === "Supplier") {
      steps = <Stepper className="col-sm-12 col-md-12" activeStep={step.stepIndex}>
                <Step>
                  <StepLabel>Basic Info</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Contact Info</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Contact Person</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Signing Mandate</StepLabel>
                </Step>
              </Stepper>
    }

    return (
      <Dialog
        title={"Create " + event.alias}
        modal={true}
        autoScrollBodyContent={true}
        open={ dialogs.openCreateClientDialog }
      >
      <div className="col-sm-12 col-md-12" style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        { steps }
        {this.renderContent()}
      </div>
      { loader_div }
      </Dialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clientActions: bindActionCreators(ClientActions, dispatch)
  };
}

function mapStateToProps(state){
  return { 
    event: state.clients.event,
    dialogs: state.clients.dialogs,
    step: state.clients.step,
    createClientErrors: state.clients.createClientErrors
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateClientContent);

