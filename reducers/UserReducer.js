import update from 'immutability-helper';

import initialState from 'config/initialState';
import { UPDATE_USER } from 'config/actionTypes';

function userReducer(state = initialState.user, action) {
  switch(action.type) {
    case UPDATE_USER:
      return update(state, {
        $merge: action.user,
        initialized: { $set: true },
      });
  }
  return state;
}

export default userReducer;
