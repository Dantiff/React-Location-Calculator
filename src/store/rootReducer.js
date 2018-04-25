import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'
import calculator from '../modules/calculator/reducer';

const rootReducer = combineReducers({
  // short hand property names
  calculator,
  routing,
})

export default rootReducer;
