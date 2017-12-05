import * as moment from 'moment';
import db from 'config/db';
import { UPDATE_AUCTIONS } from 'config/actionTypes';

const auctionsRef = db.collection('auctions');

export const subscribeToAuctions = () => {
  return dispatch => {
    auctionsRef.onSnapshot(snapshot => {
      auctions = {};
      snapshot.forEach(doc => {
        if (moment.default(doc.data().end) > moment.default()) {
          auctions[doc.id] = doc.data();
        }
      });
      dispatch({
        type: UPDATE_AUCTIONS,
        auctions
      });
    });
  };
};
