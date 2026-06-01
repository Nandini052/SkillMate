// ===============================
// AUTH SYSTEM (Unified)
// ===============================

import { auth, db } from "./utils/firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Get user from localStorage
export function getCurrentUser() {
  const uid = localStorage.getItem("uid");
  if (!uid) return null;

  const userData = localStorage.getItem("skillswap_current_user");
  return userData ? JSON.parse(userData) : { id: uid };
}

// Logout
export async function logoutUser() {
  await signOut(auth);
  localStorage.removeItem("uid");
  localStorage.removeItem("skillswap_current_user");
  window.location.href = "auth.html";
}

// Require auth for pages
export async function requireAuth() {
  const user = getCurrentUser();
  if (!user) window.location.href = "auth.html";
  return user;
}

// SIGN UP
export async function signupUser(firstName, email, password) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCred.user;

  const userData = {
    firstName,
    email,
    skills_offered: [],
    skills_needed: [],
    profileComplete: false,
    createdAt: Date.now(),
  };

  await setDoc(doc(db, "users", user.uid), userData);

  // Save to localStorage
  localStorage.setItem("uid", user.uid);
  localStorage.setItem("skillswap_current_user", JSON.stringify(userData));

  // Redirect to profile setup
  window.location.replace("profile-setup.html");
}

// LOGIN
export async function loginUser(email, password) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const user = userCred.user;

  const userDoc = await getDoc(doc(db, "users", user.uid));
  const data = userDoc.data();

  localStorage.setItem("uid", user.uid);
  localStorage.setItem("skillswap_current_user", JSON.stringify(data));

  // Redirect based on profile completion
  if (data.profileComplete) {
    window.location.replace("dashboard.html");
  } else {
    window.location.replace("profile-setup.html");
  }
}

// Auth state listener
export function initAuthListener(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const data = userDoc.data();
      localStorage.setItem("uid", user.uid);
      localStorage.setItem("skillswap_current_user", JSON.stringify(data));
      if (callback) callback(data);
    } else {
      localStorage.removeItem("uid");
      localStorage.removeItem("skillswap_current_user");
      if (callback) callback(null);
    }
  });
}
