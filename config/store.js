import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import initialState from 'config/initialState';

import ErrorReducer from 'reducers/ErrorReducer';
import UserReducer from 'reducers/UserReducer';
import AuctionsReducer from 'reducers/AuctionsReducer';

const rootReducer = combineReducers({
  errors: ErrorReducer,
  user: UserReducer,
  auctions: AuctionsReducer
});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, logger)
);

export default store;
