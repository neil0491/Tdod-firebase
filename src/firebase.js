import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyC98DNhhLEgCBlHhYoCIbTh6Mx9WY1IasQ",
  authDomain: "my-todo-aplication.firebaseapp.com",
  projectId: "my-todo-aplication",
  storageBucket: "my-todo-aplication.appspot.com",
  messagingSenderId: "303907808407",
  appId: "1:303907808407:web:872c3bb61be70dd654b5d2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;