import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAPZVShkwoABdeiJ2OSSQJQ9tUmhPPEwNM",
  authDomain: "bites-and-braces-f73b8.firebaseapp.com",
  databaseURL: "https://bites-and-braces-f73b8.firebaseio.com",
  projectId: "bites-and-braces-f73b8",
  storageBucket: "bites-and-braces-f73b8.appspot.com",
  messagingSenderId: "406746669095",
  appId: "1:406746669095:web:07ec5f5abe31f2d160ae02"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };