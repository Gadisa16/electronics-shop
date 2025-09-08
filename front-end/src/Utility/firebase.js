import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
