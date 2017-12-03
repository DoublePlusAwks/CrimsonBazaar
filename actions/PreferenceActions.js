import db from 'config/db';
import {
  GET_PREFERENCE,
  SET_PREFERENCE_LOCAL,
  SET_PREFERENCE_REMOTE
} from 'config/actionTypes';

const preferencesRef = db.collection('preferences');

export const getPreference = ({ auction, owner }) => {
  return dispatch => {
    preferencesRef
      .doc(`${auction}___${owner}`)
      .get()
      .then(doc => {
        dispatch({
          type: GET_PREFERENCE
        });
        if (doc.exists) {
          dispatch({
            type: SET_PREFERENCE_LOCAL,
            preference: doc.data().preference,
            auction
          });
        }
      });
  };
};

export const setPreference = ({ auction, owner, preference }) => {
  return dispatch => {
    dispatch({
      type: SET_PREFERENCE_LOCAL,
      auction,
      preference
    });
    preferencesRef
      .doc(`${auction}___${owner}`)
      .set({
        auction,
        owner,
        preference
      })
      .then(() => {
        dispatch({
          type: SET_PREFERENCE_REMOTE,
        });
      });
  };
};
