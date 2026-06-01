// utils/request-system.js
import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  runTransaction,
  serverTimestamp,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

/**
 * RequestSystem (UPDATED FOR YOUR FIRESTORE STRUCTURE)
 *
 * Your Firestore stores:
 * from  → sender UID
 * to    → receiver UID
 * status
 * timestamp  → Firestore timestamp
 *
 * Dashboard expects:
 * fromUserId
 * toUserId
 * createdAt
 */

const RequestSystem = {
  // ---------------------------------------------------
  // SEND REQUEST
  // ---------------------------------------------------
  async sendRequest(fromUserId, toUserId, message = "") {
    try {
      if (fromUserId === toUserId) {
        return { success: false, message: "You cannot connect with yourself." };
      }

      // Check for existing *pending* request
      const q = query(
        collection(db, "requests"),
        where("from", "==", fromUserId),
        where("to", "==", toUserId),
        where("status", "==", "pending")
      );
      const existing = await getDocs(q);
      if (!existing.empty) {
        return { success: false, message: "A request is already pending." };
      }

      await addDoc(collection(db, "requests"), {
        from: fromUserId,
        to: toUserId,
        message: message || "",
        status: "pending",
        timestamp: serverTimestamp()
      });

      return { success: true, message: "Request sent!" };
    } catch (err) {
      console.error("sendRequest ERROR:", err);
      return { success: false, message: "Failed to send request." };
    }
  },

  // ---------------------------------------------------
  // GET INCOMING REQUESTS
  // ---------------------------------------------------
  async getPendingRequests(userId) {
    try {
      const q = query(
        collection(db, "requests"),
        where("to", "==", userId),
        where("status", "==", "pending")
      );
      const snap = await getDocs(q);

      return snap.docs.map(d => ({
        id: d.id,
        fromUserId: d.data().from,
        toUserId: d.data().to,
        status: d.data().status,
        message: d.data().message || "",
        createdAt: d.data().timestamp
      }));
    } catch (err) {
      console.error("getPendingRequests ERROR:", err);
      return [];
    }
  },

  // ---------------------------------------------------
  // GET SENT REQUESTS
  // ---------------------------------------------------
  async getSentRequests(userId) {
    try {
      const q = query(
        collection(db, "requests"),
        where("from", "==", userId)
      );

      const snap = await getDocs(q);

      return snap.docs.map(d => ({
        id: d.id,
        fromUserId: d.data().from,
        toUserId: d.data().to,
        status: d.data().status,
        message: d.data().message || "",
        createdAt: d.data().timestamp
      }));
    } catch (err) {
      console.error("getSentRequests ERROR:", err);
      return [];
    }
  },

  // ---------------------------------------------------
  // ACCEPT REQUEST (CREATE CONNECTION)
  // ---------------------------------------------------
  async acceptRequest(currentUserId, requestId) {
    const reqRef = doc(db, "requests", requestId);

    try {
      await runTransaction(db, async (txn) => {
        const reqSnap = await txn.get(reqRef);
        if (!reqSnap.exists()) throw new Error("Request not found");

        const req = reqSnap.data();

        if (req.status !== "pending") {
          throw new Error("Request is not pending.");
        }

        if (req.to !== currentUserId) {
          throw new Error("Only the receiver can accept this request.");
        }

        const senderId = req.from;
        const receiverId = req.to;

        const senderRef = doc(db, "users", senderId);
        const receiverRef = doc(db, "users", receiverId);

        // Mutual connections
        txn.update(senderRef, { connections: arrayUnion(receiverId) });
        txn.update(receiverRef, { connections: arrayUnion(senderId) });

        // Delete request after acceptance
        txn.delete(reqRef);
      });

      return { success: true, message: "Connection created!" };
    } catch (err) {
      console.error("acceptRequest ERROR:", err);
      return { success: false, message: err.message || "Failed to accept request." };
    }
  },

  // ---------------------------------------------------
  // REJECT OR WITHDRAW REQUEST
  // ---------------------------------------------------
  async rejectRequest(currentUserId, requestId) {
    try {
      const reqRef = doc(db, "requests", requestId);
      const snap = await getDoc(reqRef);

      if (!snap.exists()) return { success: true, message: "Request removed." };

      const req = snap.data();

      // Only sender OR receiver can remove
      if (req.from !== currentUserId && req.to !== currentUserId) {
        return { success: false, message: "Not allowed." };
      }

      await deleteDoc(reqRef);

      return { success: true, message: "Request removed." };
    } catch (err) {
      console.error("rejectRequest ERROR:", err);
      return { success: false, message: "Failed to remove request." };
    }
  },

  // ---------------------------------------------------
  // GET USER CONNECTIONS
  // ---------------------------------------------------
  async getConnections(uid) {
    try {
      const ref = doc(db, "users", uid);
      const snap = await getDoc(ref);
      if (!snap.exists()) return [];
      const data = snap.data();
      return data.connections || [];
    } catch (err) {
      console.error("getConnections ERROR:", err);
      return [];
    }
  }
};

export { RequestSystem };
