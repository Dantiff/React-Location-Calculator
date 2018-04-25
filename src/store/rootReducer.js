import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'
import users from '../modules/users/reducer';

const rootReducer = combineReducers({
  // short hand property names
  users,
  routing,
})

export default rootReducer;
