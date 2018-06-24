import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDQXxWpPRj_bLwuFzXiCkOu8dWhI1l9rno",
  authDomain: "admin-59d1c.firebaseapp.com",
  databaseURL: "https://admin-59d1c.firebaseio.com",
  projectId: "admin-59d1c",
  storageBucket: "admin-59d1c.appspot.com",
  messagingSenderId: "46647097127"
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;