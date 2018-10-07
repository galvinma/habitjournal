//actions
import {  CURRENT_USER,
          AUTHENTICATED,
        }
from "../Constants/action-types";


const initialState = {
  current_user: {current_user: null},
  auth_status: {auth_status: false},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER:
      return getCurrentUser(state, action.current_user)
    case AUTHENTICATED:
      return getAuthStatus(state, action.auth_status)
    default:
      return state;
  }
};

function getCurrentUser(state, current_user) {
  return {
    ...state,
    current_user: current_user
  }
}

function getAuthStatus(state, auth_status) {
  return {
    ...state,
    auth_status: auth_status
  }
}


export default rootReducer;
