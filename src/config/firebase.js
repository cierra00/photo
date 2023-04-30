
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAVUMn_nLEpxFX9XdYqJ5kwVmB2dEB3tqI",
  authDomain: "photo-f70a4.firebaseapp.com",
  projectId: "photo-f70a4",
  storageBucket: "photo-f70a4.appspot.com",
  messagingSenderId: "287237215562",
  appId: "1:287237215562:web:a49d6a77c320289bc4ddb3",
  measurementId: "G-VZ99PPY1BL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);