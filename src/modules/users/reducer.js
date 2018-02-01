import * as types from '../../store/actionTypes';
import initialState from '../../store/initialState';

export default function UsersReducer(state = initialState.users, action) {

  var dialogs = {}; 

  switch(action.type) {
    case types.FETCHING:
      return Object.assign({}, state, { 
        loader: true,
      })
    case types.FETCH_COMPLETE:
      return Object.assign({}, state, { 
        loader: false,
      })
    case types.GET_USERS_SUCCESS:
      return Object.assign({}, state, { 
        list: action.users
      })
    case types.FETCH_ADD_USER:
      return Object.assign({}, state, { 
        loader: true,
        showCreateUserErrors: false,
        createUserErrors: {}
      })
    case types.FETCH_UPDATE_USER:
      return Object.assign({}, state, { 
        loader: true,
        showUpdateUserErrors: false,
        updateUserErrors: {}
      })
    case types.ADD_USER_SUCCESS:
    case types.REQUEST_SUSPENSION_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
      let newList = state.list.map(function(a) {
        return a.attributes.fingerprint === action.user.attributes.fingerprint ? action.user : a;
      })
      return Object.assign({}, state, { 
        loader: false,
        list: newList
      })
    case types.ADD_USER_FAIL:
      dialogs.openCreateUserDialog = true;

      return Object.assign({}, state, { 
        loader: false,
        dialogs: dialogs,
        createUserErrors: action.errors
      })
    case types.UPDATE_USER_FAIL:
      dialogs.openUpdateUserDialog = true;

      return Object.assign({}, state, { 
        loader: false,
        dialogs: dialogs,
        updateUserErrors: action.errors
      })
    case types.REQUEST_UPDATE_USER:
      var event = action.event;

      if (event === 'add') {
        dialogs.openCreateUserDialog =  true;
      }
      else if (event === 'check') {
        dialogs.openCheckUserDialog =  true;
      }
      else if (event === 'request_suspension') {
        dialogs.openRequestSuspendUserDialog = true;
      }
      else if (event === 'confirm_suspension') {
        dialogs.openConfirmSuspendUserDialog = true;
      } 
      else if (event === 'edit') {
        dialogs.openUpdateUserDialog = true;
      }

      return Object.assign({}, state, {
        dialogs: dialogs,
        updateUserErrors: {}
      })
    case types.CANCEL_UPDATE_USER:
      dialogs = { 
        openCreateUserDialog:  false,
        openCheckUserDialog:  false,
        openRequestSuspendUserDialog: false,
        openConfirmSuspendUserDialog: false,
        openUpdateUserDialog: false
      };

      return Object.assign({}, state, {
        dialogs: dialogs,
        updateUserErrors: {}
      })
    case types.GET_USER_PERMISSIONS_SUCCESS:
      return Object.assign({}, state, { 
        user_permissions: action.permissions
      })
    case types.GET_ALL_PERMISSIONS_SUCCESS:
      return Object.assign({}, state, { 
        all_permissions: action.permissions
      })
    case types.GENERAL_ERROR:
      return Object.assign({}, state, { 
        loader: false
      })
    default:
      return state;
  }
}
