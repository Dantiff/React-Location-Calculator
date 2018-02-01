import * as types from '../../store/actionTypes';
import initialState from '../../store/initialState';

export default function SessionReducer(state = initialState.sessions, action) {
  switch(action.type) {
    case types.FETCH_AUTH:
      return Object.assign({}, state, {
        loader: true,
      })
    case types.REQUIRE_OTP:
      return Object.assign({}, state, { 
        error: false, 
        requireOtp: true, 
        user_id: action.user_id, 
        message:'',
        loader: false 
      })
    case types.FETCH_CONFIRM_OTP:
      return Object.assign({}, state, {
        loader: true,
      })
    case types.FETCH_RESEND_OTP:
      return Object.assign({}, state, {
        loader: true
      })
    case types.RESEND_OTP_SUCCESS:
      return Object.assign({}, state, {
        loader: false,
        user_id: action.user_id, 
      })
    case types.RESEND_OTP_FAIL:
      return Object.assign({}, state, {
        loader: false,
      })
    case types.LOG_IN_SUCCESS:
      return Object.assign({}, state, {
        requireOtp: false,
        error: false,
        auth_user: action.auth_user,
        auth_token: action.auth_token,
        loader: false
      })
    case types.AUTH_TOKEN_VALID:
      return Object.assign({}, state, {
        requireOtp: false,
        error: false
      })
    case types.USER_LOG_OUT_SUCCESS:
      return {
        auth_token: '',
        auth_user: {}
      };
    case types.AUTH_ERROR:
      return Object.assign({}, state, {
        loader: false
      })
    case types.REDIRECTED_TO_LOGIN:
      return Object.assign({}, state, { 
        error: true, 
        message: action.message, 
        auth_token: null, 
        requireOtp: false 
      })
    case types.FETCH_PASSWORD_FORGOT:
      return Object.assign({}, state, {
        loader: true,
      })
    case types.PASSWORD_FORGOT_SUCCESS:
      return Object.assign({}, state, {
        loader: false,
      })
    case types.PASSWORD_FORGOT_FAIL:
      return Object.assign({}, state, {
        loader: false,
      })
    case types.FETCH_PASSWORD_RESET:
      return Object.assign({}, state, {
        loader: true
      })
    case types.PASSWORD_RESET_SUCCESS:
      return Object.assign({}, state, {
        loader: false,
        passwordResetSuccess: true
      })
    case types.PASSWORD_RESET_FAIL:
      return Object.assign({}, state, {
        loader: false,
      })
    default:
      return state;
  }
}
