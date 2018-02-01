import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ClientActions from '../actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class RequestSuspendClientContent extends Component {
    constructor(props) {
    super(props);
    this.state = { selectedClient: {} };
  };  

  componentWillReceiveProps() {
    this.setState({selectedClient: this.props.client});
  };

  handleCloseUpdateClientDialog () {
    this.props.clientActions.cancelUpdateClient();
  };

  requestSuspension (e) {
    e.preventDefault();

    this.props.clientActions.requestSuspension(this.state.selectedClient);
  };

  render() { 

    const { client, dialogs } = this.props;
 
    return (
      <span>

        <Dialog
          title="Request Client Suspension"
          modal={ true }
          open={ dialogs.openRequestSuspendClientDialog }
        >

          Are you sure you want to request user suspension of <strong>{ client.name }</strong>?

          <div className="modal-actions"> 

            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={ this.handleCloseUpdateClientDialog.bind(this) }
            />
            <FlatButton
              label="Continue"
              primary={ true }
              onTouchTap={ this.requestSuspension.bind(this) }
            />
          </div>

        </Dialog>

      </span>
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
    dialogs: state.clients.dialogs
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RequestSuspendClientContent);
