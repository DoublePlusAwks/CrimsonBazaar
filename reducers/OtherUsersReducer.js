import update from 'immutability-helper';
import initialState from 'config/initialState';
import { GET_OTHER_USER } from 'config/actionTypes';

function otherUsersReducer(state = initialState.otherUsers, action) {
  switch(action.type) {
    case GET_OTHER_USER:
      return update(state, {
        [action.otherUserId]: { $set: action.otherUser }
      });
  }
  return state;
}

export default otherUsersReducer;
