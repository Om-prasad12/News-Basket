import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBIkL2jEbHpgzxXSLtNVTR7Eb5fPVSlQL8",
  authDomain: "fir-mmsummertask.firebaseapp.com",
  projectId: "fir-mmsummertask",
  storageBucket: "fir-mmsummertask.appspot.com",
  messagingSenderId: "369917157946",
  appId: "1:369917157946:web:4400c9ace1157847a40b03",
  measurementId: "G-2W0JLE09HY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth();
const db =getFirestore();
export {app,auth,db};