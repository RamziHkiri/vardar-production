// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1rCGFDEXiaY8fYEo4AnnjPTumBsi567I",
  authDomain: "endorphineprod-71.firebaseapp.com",
  projectId: "endorphineprod-71",
  storageBucket: "endorphineprod-71.appspot.com",
  messagingSenderId: "43702030188",
  appId: "1:43702030188:web:4b528212a62f57c3cc6d49"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;