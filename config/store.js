import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import initialState from 'config/initialState';

import ErrorReducer from 'reducers/ErrorReducer';
import UserReducer from 'reducers/UserReducer';

const rootReducer = combineReducers({
  errors: ErrorReducer,
  user: UserReducer
});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, logger)
);

export default store;
