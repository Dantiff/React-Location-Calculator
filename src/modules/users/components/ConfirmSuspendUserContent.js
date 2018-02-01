import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ConfirmSuspendUserContent extends Component {
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

  confirmSuspension (e) {
    e.preventDefault();

    this.props.userActions.confirmSuspension(this.state.selectedUser);
  };

  render() { 

    const { user, dialogs } = this.props;
 
    return (
      <span>

        <Dialog
          title={ "Suspend " + user.name }
          modal={ true }
          open={ dialogs.openConfirmSuspendUserDialog }
        >
          <p>This user will not be able to:</p>
          <ul>
          <li>Login to Umati Capital</li>
          <li>Perform any tasks as previously delegated by Umati Capital</li>
          </ul>
          <p>This is a <strong>final</strong> action and <strong>cannot</strong> be reversed.</p>

          <div className="modal-actions"> 

            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={ this.handleCloseUpdateUserDialog.bind(this) }
            />
            <FlatButton
              label="Suspend User"
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
    userActions: bindActionCreators(userActions, dispatch)
  };
}

function mapStateToProps(state){
  return { 
    dialogs: state.users.dialogs
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ConfirmSuspendUserContent);
