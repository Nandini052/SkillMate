import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5qXlIPMr2a0iKShp9ZmImlp0qSGejta4",
  authDomain: "skillmate-c714f.firebaseapp.com",
  projectId: "skillmate-c714f",
  storageBucket: "skillmate-c714f.firebasestorage.app",
  messagingSenderId: "930805958867",
  appId: "1:930805958867:web:808716df41ec201f272c26",
  measurementId: "G-K5TFL99HZM"
};
// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Firebase services so you can use them elsewhere
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
