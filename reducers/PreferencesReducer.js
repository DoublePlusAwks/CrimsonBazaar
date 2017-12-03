import update from 'immutability-helper';
import initialState from 'config/initialState';
import {
  SET_PREFERENCE_LOCAL,
} from 'config/actionTypes';

function preferencesReducer(state = initialState.preferences, action) {
  switch(action.type) {
    case SET_PREFERENCE_LOCAL:
      return update(state, {
        [action.auction]: { $set: action.preference }
      });
  }
  return state;
}

export default preferencesReducer;
