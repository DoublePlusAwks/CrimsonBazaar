import db from 'config/db';
import { COMPLETE_TRADE, UPDATE_TRADES_TO, UPDATE_TRADES_FROM } from 'config/actionTypes';

const tradesRef = db.collection('trades');

export const subscribeToTrades = owner => {
  return dispatch => {
    const outstandingTrades = tradesRef.where('completed', '==', false);
    outstandingTrades.where('fromUser', '==', owner)
      .onSnapshot(snapshot => {
        console.log(snapshot);
        const fromTrades = {};
        snapshot.forEach(doc => {
          fromTrades[doc.id] = doc.data();
        });
        dispatch({
          type: UPDATE_TRADES_FROM,
          trades: fromTrades
        });
      });
    outstandingTrades.where('toUser', '==', owner)
      .onSnapshot(snapshot => {
        const toTrades = {};
        snapshot.forEach(doc => {
          toTrades[doc.id] = doc.data();
        });
        dispatch({
          type: UPDATE_TRADES_TO,
          trades: toTrades
        });
      });
  };
};

export const completeTrade = (tradeId, successCallback) => {
  return dispatch => {
    tradesRef.doc(tradeId).update({
      completed: true
    })
    .then(() => {
      dispatch({
        type: COMPLETE_TRADE,
        tradeId
      });
      if (successCallback) {
        successCallback();
      }
    });
  }
}
