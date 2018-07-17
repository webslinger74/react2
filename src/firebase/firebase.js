import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    
    apiKey: "AIzaSyDhlwDDcLG_tx8Jk4CArCt_AmHz5beystc",
    authDomain: "webapplication-26ea2.firebaseapp.com",
    databaseURL: "https://webapplication-26ea2.firebaseio.com",
    projectId: "webapplication-26ea2",
    storageBucket: "webapplication-26ea2.appspot.com",
    messagingSenderId: "635474712187"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;

