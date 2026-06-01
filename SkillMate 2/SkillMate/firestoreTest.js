import { db } from "./firebaseInit";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function testFirestore() {
  try {
    const docRef = await addDoc(collection(db, "testCollection"), {
      name: "Nandini",
      skill: "Web Development",
      timestamp: serverTimestamp(),
    });
    console.log("✅ Document written with ID:", docRef.id);

    console.log("📄 Data:", {
      name: "Nandini",
      skill: "Web Development",
      timestamp: new Date().toLocaleString(),
    });
  } catch (e) {
    console.error("❌ Error adding document:", e);
  }
}

testFirestore();
