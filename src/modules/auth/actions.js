import { history } from '../../store/configureStore';
import sessionsApi from '../.././api/sessionsApi';
import * as action from './actionCreators';
import {toastr} from 'react-redux-toastr';

export function logInUser(auth) {
  return function(dispatch) {

    dispatch(action.dispatchFetchAuth());

    return sessionsApi.logInUser(auth).then(response => {

      console.log("jtw user", localStorage.getItem("auth_user"))

      console.log("auth token", localStorage.getItem("auth_token"))

      console.log("otp", response.data.attributes.otp_code);

      console.log("otp", response.data.attributes.otp_code);

      dispatch(action.userRequireOtp(response.data.attributes));

      toastr.success('Login Successful!', 'Proceed with the one time password');

    }).catch((error) => {

      dispatch(action.dispatchAuthError(error));

      toastr.error('Login Failed!', error.error);

    });
  };
}

export function logOutUser() {
  return function(dispatch) {

    try {

      localStorage.removeItem('auth_token');

      localStorage.removeItem('auth_user');

      dispatch(action.userLogOutSuccess());

      history.push('/');

    }catch(e) {

      console.log(e)

      toastr.error('Failed!', 'User logout failed');

    };
  };
}

export function confirmOtp(auth) {
  return function(dispatch) {

    dispatch(action.dispatchFetchOtp());

    return sessionsApi.confirmOtp(auth).then(response => {

      localStorage.setItem('auth_token', response.data.attributes.jwt_token);

      localStorage.setItem('auth_user', JSON.stringify(response.data.attributes));

      toastr.success('Login Successful!', '');

      dispatch(action.userLoginSuccess(response.data.attributes));

      history.push('/users');

    }).catch((error) => {

      dispatch(action.dispatchAuthError(error));

      toastr.error('Verification Failed!', error.error);
    });
  };
}

export function resendOtp(Id) {
  return function(dispatch) {

    dispatch(action.dispatchFetchResendOtp());

    return sessionsApi.resendOtp(Id).then(response => {

      toastr.success('Code Resent Successfully!', '');

      dispatch(action.dispatchResendOtpSuccess(response));

    }).catch((error) => {

      dispatch(action.dispatchResendOtpFail(error));

      toastr.error('Code Resend Failed!', error.error);
    });
  };
}

export function checkAuthTokenValidity(currentURL) {
  return function(dispatch) {

    return sessionsApi.checkAuthTokenValidity().then(response => {

      dispatch(action.validAuthToken(response));

    }).catch((error) => {

      history.push('/')

      dispatch(action.redirectedToLogin(currentURL));
    });
  };
}

export function redirectedToLogin(currentURL) {
  return function(dispatch){

    history.push('/')

    dispatch(action.redirectedToLogin(currentURL))
  }
}

export function forgotPassword(email) {
  return function(dispatch) {

    dispatch(action.dispatchFetchForgot());

    return sessionsApi.forgotPassword(email).then(response => {

      dispatch(action.dispatchForgotSuccess(response));

      toastr.success('Request Successful!', response.message);

    }).catch((error) => {

      dispatch(action.dispatchForgotFail(error));

      toastr.error('Request Failed!', error.error)
    });
  };
}

export function resetPassword(email) {
  return function(dispatch) {

    dispatch(action.dispatchFetchReset());

    return sessionsApi.resetPassword(email).then(response => {

      history.push('/')

      dispatch(action.dispatchResetSuccess(response));

      toastr.success('Request Successful!', "You have Successfully changed your password");

    }).catch((error) => {

      dispatch(action.dispatchResetFail(error));

      toastr.error('Request Failed!', error.error)
    });
  };
}

export function returnHome() {
  history.push('/')
}

