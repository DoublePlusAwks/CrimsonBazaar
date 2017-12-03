import update from 'immutability-helper';
import initialState from 'config/initialState';
import {
  GET_PREFERENCE_ATTEMPT,
  GET_PREFERENCE,
  SET_PREFERENCE_LOCAL,
} from 'config/actionTypes';

function preferencesReducer(state = initialState.preferences, action) {
  switch(action.type) {
    case GET_PREFERENCE_ATTEMPT:
      return update(state, {
        fetching: { $set: true }
      });
    case GET_PREFERENCE:
      return update(state, {
        fetching: { $set: false },
        [action.auction]: { $set: action.preference }
      });
    case SET_PREFERENCE_LOCAL:
      return update(state, {
        [action.auction]: { $set: action.preference }
      });
  }
  return state;
}

export default preferencesReducer;
