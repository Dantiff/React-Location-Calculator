import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as ClientActions from '../actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class CheckClientContent extends Component {
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

  checkClient (e) {
    e.preventDefault();

    this.props.clientActions.checkClient(this.state.selectedClient);
  };

  render() { 

    const { client, dialogs } = this.props;
 
    return (
      <span>

        <Dialog
          title={"Check " + client.name }
          modal={ true }
          open={ dialogs.openCheckClientDialog }
        >

          Are you sure you want to check <strong>{ client.name }</strong>?

          <div className="modal-actions"> 

            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={ this.handleCloseUpdateClientDialog.bind(this) }
            />
            <FlatButton
              label="Continue"
              primary={ true }
              onTouchTap={ this.checkClient.bind(this) }
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

export default connect(mapStateToProps,mapDispatchToProps)(CheckClientContent);
