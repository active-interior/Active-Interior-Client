// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY7sWplz6R563aX7CXPLWaKSQVrHZNLD4",
  authDomain: "active-interior.firebaseapp.com",
  projectId: "active-interior",
  storageBucket: "active-interior.firebasestorage.app",
  messagingSenderId: "34237491138",
  appId: "1:34237491138:web:650d6f14705a69c08e985b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app};