// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgWyMoPbILoy1xtFoZNwl9jim9q738-uc",
  authDomain: "perceptive-day-367207.firebaseapp.com",
  projectId: "perceptive-day-367207",
  storageBucket: "perceptive-day-367207.appspot.com",
  messagingSenderId: "731444280130",
  appId: "1:731444280130:web:b2681e1cd6ce98a020e6db",
  measurementId: "G-QEJX1XBD23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
// const analytics = getAnalytics(app);