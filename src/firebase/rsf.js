// import firebase from 'firebase/app'
// import 'firebase/firestore'
//
// firebase.initializeApp({
//   apiKey: "AIzaSyAvFb53h9d6JN_qQlVhjcNXsuVp_ZVmQZU",
//   authDomain: "todo-6b56c.firebaseapp.com",
//   databaseURL: "https://todo-6b56c.firebaseio.com",
//   projectId: "todo-6b56c",
//   storageBucket: "todo-6b56c.appspot.com",
//   messagingSenderId: "376139433479",
//   appId: "1:376139433479:web:d76a3770448fda61154ca2"
// });
//
// let db = firebase.firestore()
//
//
// export default {
//   firebase, db
// }

import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import "firebase/storage"
import ReduxSagaFirebase from 'redux-saga-firebase'

var firebaseConfig = {
  apiKey: "AIzaSyAvFb53h9d6JN_qQlVhjcNXsuVp_ZVmQZU",
  authDomain: "todo-6b56c.firebaseapp.com",
  databaseURL: "https://todo-6b56c.firebaseio.com",
  projectId: "todo-6b56c",
  storageBucket: "todo-6b56c.appspot.com",
  messagingSenderId: "376139433479",
  appId: "1:376139433479:web:d76a3770448fda61154ca2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const rsf = new ReduxSagaFirebase(firebaseApp);

export default rsf;
