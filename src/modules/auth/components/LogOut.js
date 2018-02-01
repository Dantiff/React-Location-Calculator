import { Component } from 'react';
import {connect} from 'react-redux';
import * as action from '../actionCreators';
import { history } from '../../../store/configureStore';

class LogOut extends Component {
  componentWillMount () {
    sessionStorage.removeItem('auth_token');
    localStorage.removeItem('reduxPersist:session')
    this.props.dispatch(action.userLogOutSuccess());
    history.push('/');
  }

  render () {
      return null;
  }
};

export default connect()(LogOut);


export function staffLogOut(){
  return function(dispatch) {
    return

  };
}
