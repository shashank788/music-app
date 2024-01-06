// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADCozK7BjezqzDfL-BdhbGbshS0HVbvc4",
  authDomain: "clone-b0eb5.firebaseapp.com",
  projectId: "clone-b0eb5",
  storageBucket: "clone-b0eb5.appspot.com",
  messagingSenderId: "703035171172",
  appId: "1:703035171172:web:b48d18eea1efc63c78da71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };