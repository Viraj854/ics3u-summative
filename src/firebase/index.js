import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyCcqj_AT_wynCqA8Y_fLfk_EqYuUNpNyfE",
    authDomain: "summative-48eef.firebaseapp.com",
    projectId: "summative-48eef",
    storageBucket: "summative-48eef.firebasestorage.app",
    messagingSenderId: "454062771770",
    appId: "1:454062771770:web:8ed15204bdd7aa1584af03"
  };

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };