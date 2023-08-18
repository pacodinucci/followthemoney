// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBpshbGMSaZ_Kcrxg36v06llvMtq6FC9o",
  authDomain: "follow-the-money-1727c.firebaseapp.com",
  projectId: "follow-the-money-1727c",
  storageBucket: "follow-the-money-1727c.appspot.com",
  messagingSenderId: "192741467671",
  appId: "1:192741467671:web:aff605e78933b2663e1e52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth(app);

export {app, db, auth};