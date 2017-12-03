import db from 'config/db';
import {
  GET_PREFERENCE_ATTEMPT,
  GET_PREFERENCE,
  SET_PREFERENCE_LOCAL,
  SET_PREFERENCE_REMOTE,
} from 'config/actionTypes';

const preferencesRef = db.collection('preferences');

export const getPreference = ({ auction, owner }, nonExistCallback) => {
  return dispatch => {
    dispatch({
      type: GET_PREFERENCE_ATTEMPT
    });
    preferencesRef
      .doc(`${auction}___${owner}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          dispatch({
            type: GET_PREFERENCE,
            preference: doc.data().preference,
            auction
          });
        } else {
          dispatch({
            type: GET_PREFERENCE,
            preference: {},
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
