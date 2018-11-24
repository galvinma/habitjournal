//actions
import {  CURRENT_USER,
          AUTHENTICATED,
          ENTRIES_MODAL_STATE,
          EDIT_ENTRIES_MODAL_STATE,
          ENTRIES_MODAL_ID,
          CURRENT_ENTRY,
        }
from "../Constants/action-types";

const initialState = {
  current_user: {current_user: null},
  auth_status: {auth_status: false},
  entries_modal_status: {entries_modal_status: false},
  edit_entries_modal_status: {edit_entries_modal_status: false},
  entries_modal_id: {entries_modal_id: null},
  current_entry: {current_entry: null},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER:
      return getCurrentUser(state, action.current_user)
    case AUTHENTICATED:
      return getAuthStatus(state, action.auth_status)
    case ENTRIES_MODAL_STATE:
      return getEntriesModalState(state, action.entries_modal_status)
    case EDIT_ENTRIES_MODAL_STATE:
      return getEditEntriesModalState(state, action.edit_entries_modal_status)
    case ENTRIES_MODAL_ID:
      return getEntriesModalID(state, action.entries_modal_id)
    case CURRENT_ENTRY:
      return getCurrentEntry(state, action.current_entry)
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

function getEntriesModalState(state, entries_modal_status) {
  return {
    ...state,
    entries_modal_status: entries_modal_status
  }
}

function getEditEntriesModalState(state, edit_entries_modal_status) {
  return {
    ...state,
    edit_entries_modal_status: edit_entries_modal_status
  }
}

function getEntriesModalID(state, entries_modal_id) {
  return {
    ...state,
    entries_modal_id: entries_modal_id
  }
}

function getCurrentEntry(state, current_entry) {
  return {
    ...state,
    current_entry: current_entry
  }
}

export default rootReducer;
