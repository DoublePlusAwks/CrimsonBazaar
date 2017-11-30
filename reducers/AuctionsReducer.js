import update from 'immutability-helper';
import initialState from 'config/initialState';
import { GET_AUCTIONS } from 'config/actionTypes';

function auctionsReducer(state = initialState.auctions, action) {
  switch(action.type) {
    case UPDATE_AUCTIONS:
      return update(state, {
        $set: action.auctions
      });
  }
  return state;
}

export default auctionsReducer;
