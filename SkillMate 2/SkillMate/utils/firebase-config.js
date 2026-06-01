// utils/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5qXlIPMr2a0iKShp9ZmImlp0qSGejta4",
  authDomain: "skillmate-c714f.firebaseapp.com",
  projectId: "skillmate-c714f",
  storageBucket: "skillmate-c714f.firebasestorage.app",
  messagingSenderId: "930805958867",
  appId: "1:930805958867:web:808716df41ec201f272c26",
  measurementId: "G-K5TFL99HZM"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


