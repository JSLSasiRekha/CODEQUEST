// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const Firebase=require('../config')
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:Firebase.apiKey,
  authDomain:Firebase.authDomain,
  projectId:Firebase.projectId ,
  storageBucket:Firebase.storageBucket,
  messagingSenderId:Firebase.messagingSenderId,
  appId: Firebase.appId,
  measurementId:Firebase.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { storage };