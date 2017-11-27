import initialState from 'config/initialState';

function errorReducer(state = initialState.errors, action) {
  if (action.type.includes("ERROR")) {
  }
  return state;
}

export default errorReducer;
