import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyAonmUGscDOBxkft-mFBu_9bJmPrA0zyO0",
authDomain: "foto-review-production.firebaseapp.com",
projectId: "foto-review-production",
storageBucket: "foto-review-production.appspot.com",
messagingSenderId: "367211821443",
appId: "1:367211821443:web:9ffd797beeb8599f8c5eb6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()

const db = firebase.firestore();

const storage = firebase.storage();

export { db, storage, auth, firebase as default }