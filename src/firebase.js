import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOVc6q2ZM_c0HtavzQ1igBp-rLjhZiY7g",
    authDomain: "forumapp-b502a.firebaseapp.com",
    projectId: "forumapp-b502a",
    storageBucket: "forumapp-b502a.appspot.com",
    messagingSenderId: "1049661060851",
    appId: "1:1049661060851:web:d2487423753dee47072986"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Firebase Authentication
const auth = firebase.auth();

// Initialize Firebase Functions (if needed)
const functions = firebase.functions();

export { db, auth, functions };
