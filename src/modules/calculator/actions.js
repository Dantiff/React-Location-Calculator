
import Api from '../.././api/calculator';
import * as action from './actionCreators';

export function calculateLocation(payload) {
	return function(dispatch) {
		return Api.calculateLocation(payload).then(response => {
			dispatch(action.calculateLocationSuccess(response.GoldBondCalculation));

		}).catch(error => {
			dispatch(action.dispatchGeneralError(error));
		});
	};
}


