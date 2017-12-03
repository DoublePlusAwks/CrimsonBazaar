import db from 'config/db';
import { GET_OTHER_USER } from 'config/actionTypes';

const usersRef = db.collection('users');

export const getOtherUser = otherUserId => {
  return dispatch => {
    usersRef.doc(otherUserId).get().then(doc => {
      dispatch({
        type: GET_OTHER_USER,
        otherUserId,
        otherUser: doc.data()
      });
    });
  };
};
