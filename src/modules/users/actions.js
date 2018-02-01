
import usersApi from '../.././api/usersApi';
import * as action from './actionCreators';

export function getUsers() {
	return function(dispatch) {

		return usersApi.getUsers().then(response => {

			dispatch(action.getUsersSuccess(response.data));

		}).catch(error => {

			dispatch(action.dispatchGeneralError(error));
		});
	};
}


