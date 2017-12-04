import update from 'immutability-helper';

import initialState from 'config/initialState';
import { UPDATE_USER } from 'config/actionTypes';

function userReducer(state = initialState.user, action) {
  switch(action.type) {
    case UPDATE_USER:
      if (Object.keys(action.user) == 0) {
        return update(initialState.user, {
          initialized: { $set: true },
        });
      }
      return update(state, {
        $merge: action.user,
        initialized: { $set: true },
      });
  }
  return state;
}

export default userReducer;
