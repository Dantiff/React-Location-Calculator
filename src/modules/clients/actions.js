
import clientsApi from '../.././api/clientsApi';
import * as action from './actionCreators';
import * as errorAction from '../shared/actions/ErrorActions';
import {toastr} from 'react-redux-toastr';

export function getAllClients() {
  return function(dispatch) {

    return clientsApi.getAllClients().then(response => {

      dispatch(action.getAllClientsSuccess(response.data));

    }).catch(error => {

      dispatch(action.dispatchGeneralError(error));
    });
  };
}

export function getClients(page, size) {
  return function(dispatch) {

    dispatch(action.fetchingClients());

    return clientsApi.getClients(page, size).then(response => {

      dispatch(action.getClientsSuccess(response));

    }).catch(error => {

      dispatch(action.dispatchGeneralError(error));
    });
  };
}

export function getClient(fingerprint) {
  return function(dispatch) {

    dispatch(action.fetchingClient());

    return clientsApi.getClient(fingerprint).then(response => {

      dispatch(action.getClientSuccess(response));

    }).catch(error => {

      dispatch(action.dispatchGeneralError(error));
    });
  };
}

export function checkClient(client){
  return function(dispatch){
    
    dispatch(action.cancelUpdateClient());

    dispatch(action.fetching());

    return clientsApi.checkClient(client.fingerprint).then(response => {

      dispatch(action.requestSuspensionSuccess(response));

      toastr.success('Request Successful!', client.name + ' has been successfully checked. Activation details have been to the client\'s official email.');

    }).catch(error => {

      dispatch(action.dispatchGeneralError(error));

      toastr.error('Request Failed!', error.error);
    });
  }
}

export function requestSuspension(client){
  return function(dispatch){
    
    dispatch(action.cancelUpdateClient());

    dispatch(action.fetching());

    return clientsApi.requestSuspension(client.fingerprint).then(response => {

      dispatch(action.requestSuspensionSuccess(response));

      toastr.success('Request Successful!', 'Kindly wait for an administrator to approve your request.');

    }).catch(error => {

      dispatch(action.dispatchGeneralError(error));

      toastr.error('Request Failed!', error.error);
    });
  }
}

export function confirmSuspension(client){
  return function(dispatch){

    dispatch(action.cancelUpdateClient());

    dispatch(action.fetching());

    return clientsApi.confirmSuspension(client.fingerprint).then(response => {

      dispatch(action.requestSuspensionSuccess(response));

      toastr.success('Request Successful!', client.name + ' has been successfully suspended');

    }).catch(error => {

      dispatch(action.dispatchGeneralError(error));

      toastr.error('Request Failed!', error.error);

    });
  }
}

export function addClient(client){
  return function(dispatch){

    dispatch(action.fetchAddClient());

    return clientsApi.addClient(client).then(response => {

      dispatch(action.addClientSuccess(response));

      toastr.success('Request Successful!', 'We have successfully created client');

    }).catch(error => {
      if (!!error.error) {
        dispatch(action.stepFailed());
        toastr.error('Request Failed!', error.error);         
      }
      if (!!error.errors) { 
        console.log("Cleaned errors", errorAction.cleanFormErrors(error.errors))
        dispatch(action.addClientFail(errorAction.cleanFormErrors(error.errors)));
      }
    });
  }
}

export function previousStep(){
  return function(dispatch){
    dispatch(action.previousStep());
  }
}

export function requestUpdateClient(event){
  return function(dispatch){
    var e = event.event;

    if (e === "edit_client_contact" || e === "edit_client_shareholder" || e === "add_client_contact" || e === "add_client_shareholder") {
      return setTimeout(function() {
          dispatch(action.populateProfileClientForm(event));    
          setTimeout(function() {
              dispatch(action.requestUpdateClient(event));
          }, 100);
      }, 100);
    }
    else {
      return dispatch(action.requestUpdateClient(event));
    }
  }
}

export function cancelUpdateClient(){
  return function(dispatch){
    dispatch(action.cancelUpdateClient());
  }
}

export function updateClient(client){
  return function(dispatch){

    dispatch(action.fetchAddClient());
    dispatch(action.fetchUpdateClient());

    return clientsApi.updateClient(client).then(response => {

      dispatch(action.updateClientSuccess(response));

      toastr.success('Request Successful!', 'We have successfully updated the ' + client.name + ' client');

    }).catch(error => {
      if (!!error.error) {
        dispatch(action.stepFailed());
        toastr.error('Request Failed!', error.error);         
      }
      if (!!error.errors) { 
        dispatch(action.updateClientFail(errorAction.cleanFormErrors(error.errors)));
      }
      dispatch(action.dispatchGeneralError());
    });
  }
}

export function createClientContact(data){
  return function(dispatch){

    dispatch(action.fetchAddClientContact());

    return clientsApi.createClientContact(data).then(response => {

      dispatch(action.addClientContactSuccess(response));

      toastr.success('Request Successful!', 'We have successfully create new contact.');

    }).catch(error => {
      dispatch(action.addClientContactFail(errorAction.cleanFormErrors(error.errors)));
      toastr.error('Request Failed!', error.error); 
    });
  }
}

export function createClientShareholder(data){
  return function(dispatch){

    dispatch(action.fetchAddClientShareholder());

    return clientsApi.createClientShareholder(data).then(response => {

      dispatch(action.addClientShareholderSuccess(response));

      toastr.success('Request Successful!', 'We have successfully create new shareholder.');

    }).catch(error => {
      dispatch(action.addClientShareholderFail(errorAction.cleanFormErrors(error.errors)));
      toastr.error('Request Failed!', error.error); 
    });
  }
}


export function updateClientContact(data){
  return function(dispatch){

    dispatch(action.fetchAddClientContact());

    return clientsApi.updateClientContact(data).then(response => {

      dispatch(action.updateClientContactSuccess(response));

      toastr.success('Request Successful!', 'We have successfully the contact person.');

    }).catch(error => {
      dispatch(action.addClientContactFail(errorAction.cleanFormErrors(error.errors)));
      toastr.error('Request Failed!', error.error); 
    });
  }
}

export function updateClientShareholder(data){
  return function(dispatch){

    dispatch(action.fetchAddClientShareholder());

    return clientsApi.updateClientShareholder(data).then(response => {

      dispatch(action.updateClientShareholderSuccess(response));

      toastr.success('Request Successful!', 'We have successfully updated the shareholder.');

    }).catch(error => {
      dispatch(action.addClientShareholderFail(errorAction.cleanFormErrors(error.errors)));
      toastr.error('Request Failed!', error.error); 
    });
  }
}

