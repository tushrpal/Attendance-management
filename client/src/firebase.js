// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1h9_uOeUoldxWJSj3oo5vM79j8CaNnEw",
  authDomain: "amstushar.firebaseapp.com",
  projectId: "amstushar",
  storageBucket: "amstushar.firebasestorage.app",
  messagingSenderId: "925527239440",
  appId: "1:925527239440:web:9304cacf5e6f7000bb9395",
  measurementId: "G-3ZNL2PVH9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);



export { auth } ;