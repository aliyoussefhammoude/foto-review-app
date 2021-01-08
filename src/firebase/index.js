import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

//get configuration from environment
const firebaseConfig = {};

// init firebase
firebase.initializeApp(firebaseConfig);

// get firebase auth instance
const auth = firebase.auth();

// get firebase firestore instanse
const db = firebase.firestore();

//get firebase storage
const storage = firebase.storage();

export { auth, db, storage, firebase as default };
