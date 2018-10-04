//actions
import {  GET_LEFT,
        }
from "../Constants/action-types";


const initialState = {
  left: {left:1},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case GET_LEFT:
      return getLeft(state, action.left)
    default:
      return state;
  }
};

function getLeft(state, left) {
  return {
    ...state,
    left: left
  }
}


export default rootReducer;
