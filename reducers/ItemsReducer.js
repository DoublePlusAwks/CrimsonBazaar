import update from 'immutability-helper';
import initialState from 'config/initialState';
import { UPDATE_ITEMS } from 'config/actionTypes';

function itemsReducer(state = initialState.items, action) {
  switch(action.type) {
    case UPDATE_ITEMS:
      return update(state, {
        [action.auction]: { $set: action.items }
      });
  }
  return state;
}

export default itemsReducer;
