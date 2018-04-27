
import Api from '../.././api/calculator';
import * as action from './actionCreators';

export function calculateLocation(payload) {
	return function(dispatch) {
		dispatch(action.fetching());
		return Api.calculateLocation(payload).then(response => {
			dispatch(action.fetchComplete());
			dispatch(action.calculateLocationSuccess(response.GoldBondCalculation));
		}).catch(error => {
			dispatch(action.fetchComplete());
			dispatch(action.dispatchGeneralError(error));
		});
	};
}


