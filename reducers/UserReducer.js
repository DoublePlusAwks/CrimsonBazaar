import update from 'immutability-helper';

import initialState from 'config/initialState';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, SIGNUP_SUCCESS, USER_CHANGE } from 'config/actionTypes';

function userReducer(state = initialState.user, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return update(state, {
        loggedIn: { $set: true },
      });
    case LOGOUT_SUCCESS:
      return update(state, {
        loggedIn: { $set: false }
      });
    case USER_CHANGE:
      if (action.user) {
        return update(state, {
          initialized: { $set: true },
          email: { $set: action.user.email },
          uid: { $set: action.user.uid },
          emailVerified: { $set: action.user.emailVerified },
        });
      }
  }
  return initialState.user;
}

export default userReducer;
