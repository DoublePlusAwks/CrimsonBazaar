import update from 'immutability-helper';
import initialState from 'config/initialState';
import { UPDATE_TRADES_TO, UPDATE_TRADES_FROM } from 'config/actionTypes';

function tradesReducer(state = initialState.trades, action) {
  switch(action.type) {
    case UPDATE_TRADES_TO:
      return update(state, {
        toTrades: { $set: action.trades }
      });
    case UPDATE_TRADES_FROM:
      return update(state, {
        fromTrades: { $set: action.trades }
      });
  }
  return state;
}

export default tradesReducer;
