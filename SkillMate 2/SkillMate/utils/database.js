// utils/database.js
import { db } from "./firebase-config.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

/**
 * 🔹 Firestore helper class to interact with your database
 */
class Database {
  // 🧠 Add a new user to the "users" collection
  static async addUser(uid, userData) {
    try {
      await setDoc(doc(db, "users", uid), userData);
      console.log("✅ User saved to Firestore!");
    } catch (err) {
      console.error("❌ Error saving user:", err);
    }
  }

  // 📚 Fetch a user's data
  static async getUser(uid) {
    try {
      const docRef = doc(db, "users", uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        console.log("✅ User data:", snapshot.data());
        return snapshot.data();
      } else {
        console.log("⚠️ No such user found!");
        return null;
      }
    } catch (err) {
      console.error("❌ Error reading user:", err);
    }
  }

  // ✏️ Update user skills or info (safe update)
  static async updateUser(uid, updates) {
    try {
      const docRef = doc(db, "users", uid);
      await setDoc(docRef, updates, { merge: true }); // ✅ safer
      console.log("✅ User updated successfully!");
    } catch (err) {
      console.error("❌ Update failed:", err);
    }
  }

  // 🗂️ Get all users (like community or matchmaking page)
  static async getAllUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.error("❌ Error getting all users:", err);
      return [];
    }
  }
}

export { Database };
