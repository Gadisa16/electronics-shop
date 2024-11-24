import firebase from "firebase/compat/app";
// auth
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const _env = import.meta.env;

const firebaseConfig = {
  apiKey: _env.VITE_FIREBASE_API_KEY,
  authDomain: _env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: _env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: _env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: _env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: _env.VITE_FIREBASE_APP_ID,
  measurementId: _env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
