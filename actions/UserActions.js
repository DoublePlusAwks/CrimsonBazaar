import {
  LOGIN_SUCCESS, LOGOUT_SUCCESS, LOGIN_ERROR,
  SIGNUP_SUCCESS, SIGNUP_ERROR,
  VERIFY_EMAIL, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_ERROR,
  USER_CHANGE
} from 'config/actionTypes';
import firebase from 'config/firebase';

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

export const subscribeToAuth = () => {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      dispatch({
        type: USER_CHANGE,
        user
      });
      if (!user) {
        dispatch(logoutSuccess());
      }
      else if (user.email && user.uid) {
        dispatch(loginSuccess());
      }
    });
  }
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

export const signup = ({ email, password }) => {
  return dispatch => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(verifyEmail());
        dispatch(signupSuccess());
      })
      .catch(err => dispatch(signupError(err)));
  };
};
