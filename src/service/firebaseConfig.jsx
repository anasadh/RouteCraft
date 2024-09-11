// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMN42d1cuDGWVLa-enmmSpZVptIczioic",
  authDomain: "travel-itinerary-generat-68043.firebaseapp.com",
  projectId: "travel-itinerary-generat-68043",
  storageBucket: "travel-itinerary-generat-68043.appspot.com",
  messagingSenderId: "53646232059",
  appId: "1:53646232059:web:1cb82363ee748c7498a35e",
  measurementId: "G-N5YL8DLR0N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);



