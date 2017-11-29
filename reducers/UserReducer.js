import update from 'immutability-helper';

import initialState from 'config/initialState';
import { UPDATE_USER } from 'config/actionTypes';

function userReducer(state = initialState.user, action) {
  switch(action.type) {
    case UPDATE_USER:
      return update(state, {
        initialized: { $set: true },
        email: { $set: action.user && action.user.email },
        uid: { $set: action.user && action.user.uid },
        emailVerified: { $set: action.user && action.user.emailVerified },
      });
  }
  return state;
}

export default userReducer;
