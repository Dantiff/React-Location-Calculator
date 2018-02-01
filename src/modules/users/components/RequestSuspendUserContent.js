import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class RequestSuspendUserContent extends Component {
    constructor(props) {
    super(props);
    this.state = { selectedUser: {} };
  };

  componentWillReceiveProps() {
    this.setState({selectedUser: this.props.user});
  };

  handleCloseUpdateUserDialog () {
    this.props.userActions.cancelUpdateUser();
  };

  requestSuspension (e) {
    e.preventDefault();

    this.props.userActions.requestSuspension(this.state.selectedUser.fingerprint);
  };

  render() { 

    const { user, dialogs } = this.props;
 
    return (
      <span>

        <Dialog
          title="Request User Suspension"
          modal={ true }
          open={ dialogs.openRequestSuspendUserDialog }
        >

          Are you sure you want to request user suspension of <strong>{ user.name }</strong>?

          <div className="modal-actions"> 

            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={ this.handleCloseUpdateUserDialog.bind(this) }
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
    userActions: bindActionCreators(userActions, dispatch)
  };
}

function mapStateToProps(state){
  return { 
    dialogs: state.users.dialogs
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RequestSuspendUserContent);
