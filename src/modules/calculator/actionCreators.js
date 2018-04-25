import * as types from '../.././store/actionTypes';


export function fetching (response){
  return{
    type: types.FETCHING
  }
}

export function fetchComplete (response){
  return{
    type: types.FETCH_COMPLETE
  }
}

export function calculateLocationSuccess(data) {
  return {
     type: types.CALCULATE_LOCATION_SUCCESS,
     data: data
  }
}

export function dispatchGeneralError(message) {
  return {
    type: types.GENERAL_ERROR,
    errors: true,
    message: message.error
  }
}
