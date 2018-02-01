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

export function fetchAddUser(response){
  return{
    type: types.FETCH_ADD_USER,
  }
}

export function addUserSuccess(response){
  return{
    type: types.ADD_USER_SUCCESS,
    user: response.data
  }
}

export function addUserFail (errors) {
  return{
    type: types.ADD_USER_FAIL,
    errors: errors
  }
}

export function requestSuspensionSuccess(response){
  return{
    type: types.REQUEST_SUSPENSION_SUCCESS,
    user: response.data
  }
}

export function fetchUpdateUser(){
  return{
    type: types.FETCH_UPDATE_USER
  }
}

export function updateUserSuccess(response){
  return{
    type: types.UPDATE_USER_SUCCESS,
    user: response.data
  }
}

export function updateUserFail(errors){
  return{
    type: types.UPDATE_USER_FAIL,
    errors: errors
  }
}

export function requestUpdateUser(event){
  return{
    type: types.REQUEST_UPDATE_USER,
    event: event
  }
}

export function cancelUpdateUser(){
  return{
    type: types.CANCEL_UPDATE_USER
  }
}

export function getUserPermissionsSuccess(response){
  return{
    type: types.GET_USER_PERMISSIONS_SUCCESS,
    permissions: response
  }
}

export function getAllPermissionsSuccess(response){
  return{
    type: types.GET_ALL_PERMISSIONS_SUCCESS,
    permissions: response
  }
}

export function dispatchGeneralError(message) {
  return {
    type: types.GENERAL_ERROR,
    errors: true,
    message: message.error
  }
}
