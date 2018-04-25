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

export function getUsersSuccess(users) {
  return {
     type: types.GET_USERS_SUCCESS,
     users: users
  }
}

export function dispatchGeneralError(message) {
  return {
    type: types.GENERAL_ERROR,
    errors: true,
    message: message.error
  }
}
