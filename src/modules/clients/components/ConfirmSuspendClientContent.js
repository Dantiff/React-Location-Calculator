import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ClientActions from '../actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ConfirmSuspendClientContent extends Component {
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

  confirmSuspension (e) {
    e.preventDefault();

    this.props.clientActions.confirmSuspension(this.state.selectedClient);
  };

  render() { 

    const { client, dialogs } = this.props;
 
    return (
      <span>

        <Dialog
          title={ "Suspend " + client.name }
          modal={ true }
          open={ dialogs.openConfirmSuspendClientDialog }
        >
          <p>This client and its people will not be able to:</p>
          <ul>
          <li>Login to Umati Capital</li>
          <li>Perform any tasks as previously delegated by Umati Capital</li>
          </ul>
          <p>This is a <strong>final</strong> action and <strong>cannot</strong> be reversed.</p>

          <div className="modal-actions"> 

            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={ this.handleCloseUpdateClientDialog.bind(this) }
            />
            <FlatButton
              label="Suspend Client"
              primary={ true }
              onTouchTap={ this.confirmSuspension.bind(this) }
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

export default connect(mapStateToProps,mapDispatchToProps)(ConfirmSuspendClientContent);
