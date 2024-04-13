// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD8cgv4ln6egZvG-H_oloCh8C3Z6-HG9Y",
  authDomain: "btp610-project-e6abd.firebaseapp.com",
  projectId: "btp610-project-e6abd",
  storageBucket: "btp610-project-e6abd.appspot.com",
  messagingSenderId: "235290204474",
  appId: "1:235290204474:web:99ad065950a1ff9ef15803"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);


export {db, auth}