import 'firebase/firestore'
import firebase from 'config/firebase';

// https://github.com/firebase/firebase-js-sdk/issues/283
// Deep magic
// Fuck this shit
const originalSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
  if (body === '') {
    originalSend.call(this);
  } else {
    originalSend.call(this, body);
  }
};

export default firebase.firestore();