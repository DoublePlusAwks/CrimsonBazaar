import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import initialState from 'config/initialState';

import ErrorReducer from 'reducers/ErrorReducer';
import UserReducer from 'reducers/UserReducer';
import AuctionsReducer from 'reducers/AuctionsReducer';
import ItemsReducer from 'reducers/ItemsReducer';
import PreferencesReducer from 'reducers/PreferencesReducer';
import TradesReducer from 'reducers/TradesReducer';
import OtherUsersReducer from 'reducers/OtherUsersReducer';
import StatusReducer from 'reducers/StatusReducer';

const rootReducer = combineReducers({
  errors: ErrorReducer,
  user: UserReducer,
  auctions: AuctionsReducer,
  items: ItemsReducer,
  preferences: PreferencesReducer,
  trades: TradesReducer,
  otherUsers: OtherUsersReducer,
  status: StatusReducer
});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, logger)
);

export default store;
