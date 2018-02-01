
import usersApi from '../.././api/usersApi';
import * as action from './actionCreators';
import * as errorAction from '../shared/actions/ErrorActions';
import {toastr} from 'react-redux-toastr';

export function getUsers() {
	return function(dispatch) {

		return usersApi.getUsers().then(response => {

			dispatch(action.getUsersSuccess(response.data));

		}).catch(error => {

			dispatch(action.dispatchGeneralError(error));
		});
	};
}

export function getUserPermissions(user){
	return function(dispatch){

		return usersApi.getUserPermissions(user).then(response => {

			dispatch(action.getUserPermissionsSuccess(response));

		}).catch(error => {

			dispatch(action.dispatchGeneralError(error));
		});
	}
}

export function getAllPermissions(user){
	return function(dispatch){

		return usersApi.getAllPermissions(user).then(response => {

			dispatch(action.getAllPermissionsSuccess(response));

		}).catch(error => {

			dispatch(action.dispatchGeneralError(error));
		});
	}
}

export function checkUser(user){
	return function(dispatch){
		
		dispatch(action.cancelUpdateUser());

		dispatch(action.fetching());

		return usersApi.checkUser(user.fingerprint).then(response => {

			dispatch(action.requestSuspensionSuccess(response));

			toastr.success('Request Successful!', user.name + ' has been successfully checked. Activation details have been to the user\'s email.');

		}).catch(error => {

			dispatch(action.dispatchGeneralError(error));

			toastr.error('Request Failed!', error.error);
		});
	}
}

export function requestSuspension(fingerprint){
	return function(dispatch){
		
		dispatch(action.cancelUpdateUser());

		dispatch(action.fetching());

		return usersApi.requestSuspension(fingerprint).then(response => {

			dispatch(action.requestSuspensionSuccess(response));

			toastr.success('Request Successful!', 'Kindly wait for an administrator to approve your request.');

		}).catch(error => {

			dispatch(action.dispatchGeneralError(error));

			toastr.error('Request Failed!', error.error);
		});
	}
}

export function confirmSuspension(user){
	return function(dispatch){

		dispatch(action.cancelUpdateUser());

		dispatch(action.fetching());

		return usersApi.confirmSuspension(user.fingerprint).then(response => {

			dispatch(action.requestSuspensionSuccess(response));

			toastr.success('Request Successful!', user.name + ' has been successfully suspended');

		}).catch(error => {

			dispatch(action.dispatchGeneralError(error));

			toastr.error('Request Failed!', error.error);

		});
	}
}

export function addUser(user){
	return function(dispatch){

		dispatch(action.cancelUpdateUser());

		dispatch(action.fetchAddUser());

		return usersApi.addUser(user).then(response => {

			dispatch(action.addUserSuccess(response));

			toastr.success('Request Successful!', 'We have successfully created user'); 

			usersApi.getUsers().then(response => {
				dispatch(action.getUsersSuccess(response.data));
			}).catch(error => {
				dispatch(action.dispatchGeneralError(error));
			});

		}).catch(error => {

			dispatch(action.addUserFail(errorAction.cleanFormErrors(error.errors)));

			toastr.error('Request Failed!', error.error);
		});
	}
}

export function updateUser(user){
	return function(dispatch){
		
		dispatch(action.cancelUpdateUser());

		dispatch(action.fetchUpdateUser());

		return usersApi.updateUser(user).then(response => {
			
			usersApi.getUserPermissions(JSON.parse(localStorage.getItem("auth_user"))).then(response => {
				dispatch(action.getUserPermissionsSuccess(response));
			}).catch(error => {
				dispatch(action.dispatchGeneralError(error));
			});

			dispatch(action.updateUserSuccess(response));

			toastr.success('Request Successful!', 'We have successfully updated user');

		}).catch(error => {

			dispatch(action.updateUserFail(errorAction.cleanFormErrors(error.errors)));

			toastr.error('Request Failed!', error.error);
		});
	}
}

export function requestUpdateUser(event){
	return function(dispatch){
		dispatch(action.requestUpdateUser(event));
	}
}

export function cancelUpdateUser(){
	return function(dispatch){
		dispatch(action.cancelUpdateUser());
	}
}

export function changePassword(creds){
	return function(dispatch){

		dispatch(action.fetching());

		return usersApi.changePassword(creds).then(response => {

			dispatch(action.fetchComplete());

			toastr.success('Request Successful!', 'You have successfully changed your account\'s password');

		}).catch(error => {

			dispatch(action.fetchComplete());

			toastr.error('Request Failed!', error.error);
		});
	}
}
