import {
  LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_ERROR,
  SIGNUP_SUCCESS, SIGNUP_ERROR,
  VERIFY_EMAIL, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_ERROR,
  GET_USER, UPDATE_USER,
} from 'config/actionTypes';
import firebase from 'third-party-apis/firebase';
import db from 'config/db';

const usersRef = db.collection('users');

const loginError = error => {
  return {
    type: LOGIN_ERROR,
    error
  };
};

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const userChange = user => {
  if (!user) {
    user = {};
  }
  return {
    type: UPDATE_USER,
    user
  };
};

export const getUserFromDB = userId => {
  return dispatch => {
    usersRef.doc(userId).get().then(doc => {
      dispatch(userChange(doc.data()));
    });
  }
}

export const subscribeToAuth = () => {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      dispatch(userChange(user));
      if (!user) {
        dispatch(logoutSuccess());
      }
      else if (user.email && user.uid) {
        dispatch(loginSuccess());
        dispatch(getUserFromDB(user.uid));
      }
    });
  }
};

export const getUser = () => {
  return dispatch => {
    usersRef(firebase.auth().currentUser.uid).get().then(doc => {
      dispatch({ type: GET_USER });
      return userChange({ ...firebase.auth().currentUser, ...doc.data() });
    });
  };
};

export const login = ({ email, password }) => {
  return dispatch => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(loginSuccess());
      })
      .catch(error => dispatch(loginError(error)));
  };
};

export const logout = () => {
  return dispatch => {
    firebase.auth().signOut()
      .then(() => {
        dispatch(logoutSuccess())
      });
  };
};

const signupError = error => {
  return {
    type: SIGNUP_ERROR,
    error
  };
};

const signupSuccess = () => {
  return {
    type: SIGNUP_SUCCESS,
  };
};

const verifyEmailSuccess = () => {
  return {
    type: VERIFY_EMAIL_SUCCESS,
  };
};

const verifyEmailError = error => {
  return {
    type: VERIFY_EMAIL_ERROR,
    error
  };
};

const verifyEmail = () => {
  return dispatch => {
    firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        dispatch(verifyEmailSuccess());
      })
      .catch(error => {
        dispatch(emailError(error));
      });
  }
}

export const signup = ({ firstName, lastName, email, password }) => {
  return dispatch => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        usersRef.doc(user.uid).set({
          firstName,
          lastName,
          email
        });
        dispatch(verifyEmail());
        dispatch(signupSuccess());
      })
      .catch(err => dispatch(signupError(err)));
  };
};
