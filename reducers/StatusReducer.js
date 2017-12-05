import initialState from 'config/initialState';
import { SET_LOADING } from 'config/actionTypes';
import update from 'immutability-helper';

function errorReducer(state = initialState.status, action) {
  switch(action.type) {
    case SET_LOADING:
      return update(state, {
        loading: { $set: action.loading }
      });
  }
  return state;
}

export default errorReducer;
