import * as firebase from 'firebase';
import '@firebase/firestore';


  var config = {
    apiKey: "AIzaSyA4c8lt6sCBMdaUTL--gcIIw-NiGfhuHtg",
    authDomain: "hkrsf-csci321.firebaseapp.com",
    databaseURL: "https://hkrsf-csci321.firebaseio.com",
    projectId: "hkrsf-csci321",
    storageBucket: "hkrsf-csci321.appspot.com",
    messagingSenderId: "663836110072"
  };

export const firebaseApp = firebase.initializeApp(config);
export const db = firebase.firestore();