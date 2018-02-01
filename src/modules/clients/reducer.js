import * as types from '../../store/actionTypes';
import initialState from '../../store/initialState';

export default function ClientsReducer(state = initialState.clients, action) {

  var dialogs = Object.assign({}, state.dialogs);
  var step = Object.assign({}, state.step);
  var stepIndex = step.stepIndex;
  var stepLimit = 0;

  if (state.event.alias === "Client") {
    stepLimit = 2;
  } 

  switch(action.type) {
    case types.FETCHING:
      return Object.assign({}, state, { 
        loader: true,
      })
    case types.FETCH_COMPLETE:
      return Object.assign({}, state, { 
        loader: false,
      })
    case types.FETCHING_CLIENTS:
      return Object.assign({}, state, { 
        list: [],
        list_included: []
      })
    case types.GET_CLIENTS_SUCCESS:
      return Object.assign({}, state, { 
        list: action.clients,
        list_included: action.included
      })
    case types.GET_ALL_CLIENTS_SUCCESS:
      return Object.assign({}, state, { 
        full_list: action.clients
      })
    case types.FETCHING_CLIENT:
      return Object.assign({}, state, { 
        profileClient: {},
        profileClientIncluded: []
      })
    case types.GET_CLIENT_SUCCESS:
      return Object.assign({}, state, { 
        profileClient: action.client,
        profileClientIncluded: action.included
      })
    case types.FETCH_ADD_CLIENT:
      step = {stepIndex: stepIndex, stepLoader: true, stepFinished: stepIndex > stepLimit};

      return Object.assign({}, state, {
        step: step
      })
    case types.ADD_CLIENT_SUCCESS:
      if (state.event.alias === "Supplier") {
        step.stepIndex = stepIndex + 1;
      }
      step = {stepIndex: step.stepIndex, stepLoader: false, stepFinished: stepIndex >= stepLimit};

      return Object.assign({}, state, {
        step: step,
        list: [...state.list, action.client],
        full_list: [...state.full_list, action.client],
        selectedClient: action.client
      })
    case types.ADD_CLIENT_FAIL:
      var errors = action.errors;

      if (stepIndex === 0 && (errors.tax_id_key || errors.credit_limit_key || errors.registration_number_key) ) {
        step.stepIndex = 0;
      }else if (stepIndex === 1 && (errors.email_key || errors.mobile_number_key) ) {
        step.stepIndex = 1;
      }else if (stepIndex === 2 && errors.people !== undefined) {
        if (errors.people.email_key || errors.people.mobile_number_key || errors.people.name_key) {
          step.stepIndex = 2;
        }
      }else{
        step.stepIndex = stepIndex + 1;
        errors = {};
      }

      step = {stepIndex: step.stepIndex, stepLoader: false, stepFinished: stepIndex > stepLimit};

      return Object.assign({}, state, {
        step: step,
        createClientErrors: errors,
        selectedClient: {}
      })
    case types.FETCH_UPDATE_CLIENT:
      return Object.assign({}, state, { 
        loader: true,
        showUpdateClientErrors: false,
        updateClientErrors: {}
      })
    case types.REQUEST_SUSPENSION_SUCCESS:
    case types.UPDATE_CLIENT_SUCCESS:

      stepIndex = step.stepIndex+1;
      step = {stepIndex: stepIndex, stepLoader: false, stepFinished: stepIndex > stepLimit};

      let newList = state.list.map(function(a) {
        return a.attributes.fingerprint === action.client.attributes.fingerprint ? action.client : a;
      })
      return Object.assign({}, state, { 
        step: step,
        loader: false,
        createClientErrors: {},
        list: newList
      })
    case types.UPDATE_CLIENT_FAIL:

      return Object.assign({}, state, { 
        loader: false,
        updateClientErrors: action.errors
      })
    case types.REQUEST_UPDATE_CLIENT:
      var event = action.event.event;

      if (event === 'add') {
        dialogs.openCreateClientDialog =  true;
      }
      else if (event === 'check') {
        dialogs.openCheckClientDialog =  true;
      }
      else if (event === 'request_suspension') {
        dialogs.openRequestSuspendClientDialog = true;
      }
      else if (event === 'confirm_suspension') {
        dialogs.openConfirmSuspendClientDialog = true;
      }
      else if (event === 'add_client_contact') {
        dialogs.openClientContactDialog = true;
      }
      else if (event === 'add_client_shareholder') {
        dialogs.openClientShareholderDialog = true;
      } 
      else if (event === 'edit_client_contact') {
        dialogs.openClientContactDialog = true;
      } 
      else if (event === 'edit_client_shareholder') {
        dialogs.openClientShareholderDialog = true;
      } 

      return Object.assign({}, state, {
        event: action.event,
        dialogs: dialogs,
        updateClientErrors: {}
      })
    case types.CANCEL_UPDATE_CLIENT:

      step = {stepIndex: 0, stepLoader: false, stepFinished: false};

      dialogs = { 
        openCreateClientDialog:  false,
        openCheckClientDialog:  false,
        openRequestSuspendClientDialog: false,
        openConfirmSuspendClientDialog: false,
        openClientContactDialog: false,
        openClientShareholderDialog: false
      };

      return Object.assign({}, state, {
        event: {},
        dialogs: dialogs,
        step: step,
        loader: false,
        createClientErrors: {},
        updateClientErrors: {},
        selectedClient: {},
        profileClientContact: {},
        editProfileClientContact: false,
        createClientContactErrors: {},
        profileClientShareholder: {},
        editProfileClientShareholder: false,
        createClientShareholderErrors: {},
      })
    case types.PREVIOUS_STEP:

      if (step.stepIndex > 0) {
        step = {stepIndex: step.stepIndex - 1, stepLoader: state.stepLoader, stepFinished: stepIndex >= stepLimit};
      }

      return Object.assign({}, state, {
        step: step,
      })
    case types.STEP_FAILED:
      step = {stepIndex: step.stepIndex, stepLoader: false, stepFinished: stepIndex > stepLimit};

      return Object.assign({}, state, {
        step: step,
        createClientErrors: {},
        updateClientErrors: {}
      })
    case types.GENERAL_ERROR:
      return Object.assign({}, state, { 
        loader: false
      })
    case types.FETCH_ADD_CLIENT_CONTACT:

      dialogs.openClientContactDialog = false;
      dialogs.openClientShareholderDialog = false;

      return Object.assign({}, state, { 
        loader: true,
        dialogs: dialogs,
        createClientContactErrors: {},
      })
    case types.ADD_CLIENT_CONTACT_SUCCESS:

      dialogs.openClientContactDialog = false;

      return Object.assign({}, state, { 
        loader: false,
        dialogs: dialogs,
        createClientContactErrors: {},
        profileClientIncluded: [action.clientContact, ...state.profileClientIncluded]
      })
    case types.UPDATE_CLIENT_CONTACT_SUCCESS:

      dialogs.openClientContactDialog = false;

      let newContacts = state.profileClientIncluded.map(function(a) {
        return a.attributes.fingerprint === action.clientContact.attributes.fingerprint ? action.clientContact : a;
      })

      return Object.assign({}, state, { 
        loader: false,
        dialogs: dialogs,
        createClientContactErrors: {},
        profileClientIncluded: newContacts
      })
    case types.ADD_CLIENT_CONTACT_FAIL:

      dialogs.openClientContactDialog = true;

      return Object.assign({}, state, { 
        loader: false,
        dialogs: dialogs,
        createClientContactErrors: action.errors
      })
    case types.FETCH_ADD_CLIENT_SHAREHOLDER:

      dialogs.openClientShareholderDialog = false;

      return Object.assign({}, state, { 
        loader: true,
        dialogs: dialogs,
        createClientShareholderErrors: {}
      })
    case types.ADD_CLIENT_SHAREHOLDER_SUCCESS:

      dialogs.openClientShareholderDialog = false;

      return Object.assign({}, state, { 
        loader: false,
        dialogs: dialogs,
        createClientShareholderErrors: {},
        profileClientIncluded: [action.clientShareholder, ...state.profileClientIncluded]
      })
    case types.UPDATE_CLIENT_SHAREHOLDER_SUCCESS:

      dialogs.openClientShareholderDialog = false;

      var newShareholders = state.profileClientIncluded.map(function(a) {
        return a.attributes.fingerprint === action.clientShareholder.attributes.fingerprint ? action.clientShareholder : a;
      })

      return Object.assign({}, state, { 
        loader: false,
        dialogs: dialogs,
        createClientShareholderErrors: {},
        profileClientIncluded: newShareholders
      })
    case types.ADD_CLIENT_SHAREHOLDER_FAIL:

      dialogs.openClientShareholderDialog = true;

      return Object.assign({}, state, { 
        loader: false,
        dialogs: dialogs,
        createClientShareholderErrors: action.errors
      })
    case types.POPULATE_PROFILE_CLIENT_FORM: 

      var e = action.event.event;
      var profileClientContact = {};
      var profileClientShareholder = {};

      if (e === 'add_client_contact') {
        profileClientContact = {
                                  name: '',
                                  department: '',
                                  email: '',
                                  mobile_number: '', 
                                  authorized_person: false,
                                  signature_specimen: {} 
                                };
      } else if (e === 'edit_client_contact') {
        profileClientContact = action.event.profileClientContact;
      } 
      else if (e === 'add_client_shareholder') {
                                                  profileClientShareholder = {
                                                  name: '',
                                                  date_of_birth: new Date(),
                                                  email: '',
                                                  mobile_number: '',
                                                  identification: {
                                                    id_type: 'national_id',
                                                    id_number: ''
                                                  }, 
                                                  nationality: '',
                                                  tax_pin: '',
                                                  shares_owned: 0,
                                                  shareholder: false,
                                                  director: false,
                                                  signature_specimen: {} 
                                                };
      }
      else if (e === 'edit_client_shareholder') {
        profileClientShareholder = action.event.profileClientShareholder;
      } 


      return Object.assign({}, state, {
        event: action.event,
        profileClientShareholder: profileClientShareholder,
        profileClientContact: profileClientContact
      })
    default:
      return state;
  }
}
