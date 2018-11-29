//actions
import {  CURRENT_USER,
          AUTHENTICATED,
          ENTRIES_MODAL_STATE,
          EDIT_ENTRIES_MODAL_STATE,
          ENTRIES_MODAL_ID,
          CURRENT_ENTRY,
          ALL_ENTRIES,
          NAV_MONTHS,
          HABITS,
          HABIT_ENTRIES,
        }
from "../Constants/action-types";

const initialState = {
  current_user: {current_user: null},
  auth_status: {auth_status: false},
  entries_modal_status: {entries_modal_status: false},
  edit_entries_modal_status: {edit_entries_modal_status: false},
  entries_modal_id: {entries_modal_id: null},
  current_entry: {current_entry: null},
  all_entries: {all_entries: null},
  nav_months: {nav_months: null},
  habits: {habits: null},
  habit_entries: {habit_entries: null},
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
    case ALL_ENTRIES:
      return getAllEntries(state, action.all_entries)
    case NAV_MONTHS:
      return getNavMonths(state, action.nav_months)
    case HABITS:
      return getStoreHabits(state, action.habits)
    case HABIT_ENTRIES:
      return getStoreHabitEntries(state, action.habit_entries)
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

function getAllEntries(state, all_entries) {
  return {
    ...state,
    all_entries: all_entries
  }
}

function getNavMonths(state, nav_months) {
  return {
    ...state,
    nav_months: nav_months
  }
}

function getStoreHabits(state, habits) {
  return {
    ...state,
    habits: habits
  }
}

function getStoreHabitEntries(state, habit_entries) {
  return {
    ...state,
    habit_entries: habit_entries
  }
}


export default rootReducer;
