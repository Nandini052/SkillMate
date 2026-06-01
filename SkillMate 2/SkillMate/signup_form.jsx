import { useState } from "react";
import { auth, db } from "./firebaseInit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Create user in Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2️⃣ Add user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        skill,
        createdAt: new Date(),
      });

      console.log("✅ User registered and added to Firestore:", user.uid);
    } catch (error) {
      console.error("❌ Signup Error:", error.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Skill" value={skill} onChange={(e) => setSkill(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
