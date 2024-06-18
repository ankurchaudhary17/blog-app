import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBj8bvHMsHRDV2zUiRib85m8i5DWYGsqww",
  authDomain: "project1-78430.firebaseapp.com",
  projectId: "project1-78430",
  storageBucket: "project1-78430.appspot.com",
  messagingSenderId: "686816813977",
  appId: "1:686816813977:web:dd1cd9e1671eadb5d82908",
  measurementId: "G-XBGEB40RYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const provider=new GoogleAuthProvider();
export default app;