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

export function getAllClientsSuccess(clients) {
  return {
     type: types.GET_ALL_CLIENTS_SUCCESS,
     clients: clients
  }
}

export function fetchingClients() {
  return {
     type: types.FETCHING_CLIENTS
  }
}

export function getClientsSuccess(clients) {
  return {
     type: types.GET_CLIENTS_SUCCESS,
     clients: clients.data,
     included: clients.included
  }
}

export function fetchingClient() {
  return {
     type: types.FETCHING_CLIENT
  }
}

export function getClientSuccess(client) {
  return {
     type: types.GET_CLIENT_SUCCESS,
     client: client.data,
     included: client.included
  }
}

export function fetchAddClient(response){
  return{
    type: types.FETCH_ADD_CLIENT,
  }
}

export function addClientSuccess(response){
  return{
    type: types.ADD_CLIENT_SUCCESS,
    client: response.data
  }
}

export function addClientFail (errors) {
  return{
    type: types.ADD_CLIENT_FAIL,
    errors: errors
  }
}

export function requestSuspensionSuccess(response){
  return{
    type: types.REQUEST_SUSPENSION_SUCCESS,
    client: response.data
  }
}

export function fetchUpdateClient(){
  return{
    type: types.FETCH_UPDATE_CLIENT
  }
}

export function updateClientSuccess(response){
  return{
    type: types.UPDATE_CLIENT_SUCCESS,
    client: response.data
  }
}

export function updateClientFail(errors){
  return{
    type: types.UPDATE_CLIENT_FAIL,
    errors: errors
  }
}

export function requestUpdateClient(event){
  return{
    type: types.REQUEST_UPDATE_CLIENT,
    event: event
  }
}

export function cancelUpdateClient(){
  return{
    type: types.CANCEL_UPDATE_CLIENT
  }
}

export function previousStep(){
  return{
    type: types.PREVIOUS_STEP
  }
}

export function stepFailed(){
  return{
    type: types.STEP_FAILED
  }
}

export function dispatchGeneralError(message) {
  return {
    type: types.GENERAL_ERROR,
    errors: true,
    message: message.error
  }
}

export function fetchAddClientContact(){
  return{
    type: types.FETCH_ADD_CLIENT_CONTACT
  }
}

export function addClientContactSuccess(response){
  return{
    type: types.ADD_CLIENT_CONTACT_SUCCESS,
    clientContact: response.data
  }
}

export function updateClientContactSuccess(response){
  return{
    type: types.UPDATE_CLIENT_CONTACT_SUCCESS,
    clientContact: response.data
  }
}

export function addClientContactFail(errors){
  return{
    type: types.ADD_CLIENT_CONTACT_FAIL,
    errors: errors
  }
}

export function fetchAddClientShareholder(){
  return{
    type: types.FETCH_ADD_CLIENT_SHAREHOLDER
  }
}

export function addClientShareholderSuccess(response){
  return{
    type: types.ADD_CLIENT_SHAREHOLDER_SUCCESS,
    clientShareholder: response.data
  }
}

export function updateClientShareholderSuccess(response){
  return{
    type: types.UPDATE_CLIENT_SHAREHOLDER_SUCCESS,
    clientShareholder: response.data
  }
}

export function addClientShareholderFail(errors){
  return{
    type: types.ADD_CLIENT_SHAREHOLDER_FAIL,
    errors: errors
  }
}

export function populateProfileClientForm(event){
  return{
    type: types.POPULATE_PROFILE_CLIENT_FORM,
    event: event
  }
}


