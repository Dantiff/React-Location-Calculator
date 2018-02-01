import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'
import sessions from '../modules/auth/reducer';
import users from '../modules/users/reducer';
import clients from '../modules/clients/reducer';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
  // short hand property names
  sessions,
  users,
  clients,
  routing,
  form: formReducer,
  toastr: toastrReducer 
})

export default rootReducer;
