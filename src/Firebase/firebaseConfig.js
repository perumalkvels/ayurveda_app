import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3QCLC81LlFbeoDuPWz3c0MyNf5rNCCbE",
    authDomain: "agaram-lms.firebaseapp.com",
    databaseURL: "https://agaram-lms-default-rtdb.firebaseio.com",
    projectId: "agaram-lms",
    storageBucket: "agaram-lms.appspot.com",
    messagingSenderId: "474535912764",
    appId: "1:474535912764:web:1cab3b8a423574ef712a39"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const database = getDatabase(app);