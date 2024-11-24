// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDrub0-mxwdxa5n4odI5cbNLzu2fEENZZk",
  authDomain: "vance-sign-in.firebaseapp.com",
  projectId: "vance-sign-in",
  storageBucket: "vance-sign-in.firebasestorage.app",
  messagingSenderId: "1054140343805",
  appId: "1:1054140343805:web:611ac6a13e60b0f1ae6594",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;