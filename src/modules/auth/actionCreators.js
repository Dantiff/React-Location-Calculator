import * as types from '../../store/actionTypes';

export function dispatchFetchAuth(message) {
  return {
    type: types.FETCH_AUTH,
    errors: false,
  }
}

export function userRequireOtp(user) {
  return {
    type: types.REQUIRE_OTP,
    user_id: user.fingerprint
  }
}

export function dispatchFetchOtp() {
  return {
    type: types.FETCH_CONFIRM_OTP
  }
}

export function dispatchFetchResendOtp() {
  return {
    type: types.FETCH_RESEND_OTP
  }
}

export function dispatchResendOtpSuccess(user) {
  return {
    type: types.RESEND_OTP_SUCCESS,
    user_id: user.fingerprint
  }
}

export function dispatchResendOtpFail() {
  return {
    type: types.RESEND_OTP_FAIL
  }
}

export function userLoginSuccess(response) {
  return {
    type: types.LOG_IN_SUCCESS,
    auth_token: localStorage.getItem("auth_token"),
    auth_user: JSON.parse(localStorage.getItem("auth_user"))
  }
}

export function validAuthToken(response){
  return{
    type: types.AUTH_TOKEN_VALID,
    errors: false,
    message: response.body
  }
}

export function dispatchAuthError(message) {
  return {
    type: types.AUTH_ERROR,
    errors: true,
    message: message.error
  }
}

export function redirectedToLogin(currentURL){
  return{
    type: types.REDIRECTED_TO_LOGIN,
    currentURL: currentURL,
    errors: true,
    message: 'You must be logged in to view that page'
  }
}

export function userLogOutSuccess() {
  return {
    type: types.USER_LOG_OUT_SUCCESS
  }
}

export function dispatchFetchForgot(){
  return{
    type: types.FETCH_PASSWORD_FORGOT,
    errors: false,
  }
}

export function dispatchForgotSuccess(){
  return{
    type: types.PASSWORD_FORGOT_SUCCESS,
    errors: false,
  }
}

export function dispatchForgotFail(error){
  return{
    type: types.PASSWORD_FORGOT_FAIL,
    errors: true,
    message: error.errors
  }
}


export function dispatchFetchReset(){
  return{
    type: types.FETCH_PASSWORD_RESET,
    errors: false,
  }
}

export function dispatchResetSuccess(){
  return{
    type: types.PASSWORD_RESET_SUCCESS,
    errors: false
  }
}

export function dispatchResetFail(error){
  return{
    type: types.PASSWORD_RESET_FAIL,
    errors: true,
    message: error.errors
  }
}



