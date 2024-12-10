// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLzVnlRSOTaQIFk9aAdswmextp7GCBv6g",
  authDomain: "chatapp-55d88.firebaseapp.com",
  projectId: "chatapp-55d88",
  storageBucket: "chatapp-55d88.firebasestorage.app",
  messagingSenderId: "292173982675",
  appId: "1:292173982675:web:d06f828114138d7b919d26",
  measurementId: "G-YE7L0VSX3K"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); 
const auth = getAuth(app)

export default auth;

