// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBKU4V7s17w1l-IasVYk8FvX5hqntVvC20",
  authDomain: "tista-blockchain.firebaseapp.com",
  projectId: "tista-blockchain",
  storageBucket: "tista-blockchain.appspot.com",
  messagingSenderId: "1090552763601",
  appId: "1:1090552763601:web:a982c9a5cf0b57871961f0",
  measurementId: "G-8SN12JMB45",
});

export const auth = app.auth();
export default app;
