import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCVgWkYuXZUU8FTmmaEp_vVDvPnQRJTIic',
  authDomain: 'crudreactfirebase-5f307.firebaseapp.com',
  databaseURL: 'https://crudreactfirebase-5f307.firebaseio.com',
  projectId: 'crudreactfirebase-5f307',
  storageBucket: 'crudreactfirebase-5f307.appspot.com',
  messagingSenderId: '309390802675',
  appId: '1:309390802675:web:751a83eebcf1d1c0c2c186',
  measurementId: 'G-0C6VY6GPKY',
};
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
