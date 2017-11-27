import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAnJo5KOL3_Jvc0GqWYWgFb1auuFZb9z8I",
  authDomain: "crimsonbazaar-dev.firebaseapp.com",
  databaseURL: "https://crimsonbazaar-dev.firebaseio.com",
  projectId: "crimsonbazaar-dev",
  storageBucket: "crimsonbazaar-dev.appspot.com",
  messagingSenderId: "733620785594"
};
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default firebase;
