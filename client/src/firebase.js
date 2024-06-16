import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBVzCS5oSxA_RmOzo_EZR_kSeR_cPPTWvs",
  authDomain: "video-827dc.firebaseapp.com",
  projectId: "video-827dc",
  storageBucket: "video-827dc.appspot.com",
  messagingSenderId: "957631246897",
  appId: "1:957631246897:web:a5ba789c6f2791ef499b10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const provider=new GoogleAuthProvider();
export default app;