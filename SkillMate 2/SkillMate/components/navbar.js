// components/navbar.js
import { auth, db } from "../utils/firebase-config.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

class CustomNavbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();

    this.ensureFirebaseReady()
      .then(() => this.watchAuthState())
      .catch((err) => console.error("⚠️ Firebase init error:", err));
  }

  // 🧠 Wait until Firebase Auth is fully ready
  async ensureFirebaseReady() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (auth && typeof auth.onAuthStateChanged === "function") {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });
  }

  // 👀 Watch Firebase Authentication changes
  watchAuthState() {
    console.log("👀 Watching Firebase Auth...");

    auth.onAuthStateChanged(async (user) => {
      const authSection = this.querySelector(".auth-section");
      if (!authSection) return;

      if (user) {
        console.log("✅ Logged in Firebase user:", user.uid);

        let firstName = "";
        let avatarURL = "";

        try {
          // ✅ Fetch Firestore user doc correctly
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            console.log("📄 Firestore user data:", data);
            firstName =
              data.firstName?.trim() ||
              user.displayName?.split(" ")[0] ||
              "User";
          } else {
            console.warn(
              "⚠️ No Firestore record found. Creating a default one..."
            );
            firstName = user.displayName?.split(" ")[0] || "User";

            // ✅ Ensure we use the db object properly in setDoc
            await setDoc(userRef, {
              firstName,
              email: user.email || "",
              createdAt: new Date().toISOString(),
            });
            console.log("✅ Default Firestore record created!");
          }

          avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            firstName
          )}&background=6366f1&color=fff`;
        } catch (error) {
          console.error("🔥 Firestore fetch error (navbar):", error);
          firstName = user.displayName?.split(" ")[0] || "User";
          avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            firstName
          )}&background=6366f1&color=fff`;
        }

        // ✅ Update navbar content dynamically
        authSection.innerHTML = `
          <div class="flex items-center space-x-4">
            <a href="dashboard.html" class="text-gray-600 hover:text-indigo-600 transition duration-200">Dashboard</a>

            <div class="relative group">
              <button class="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 profile-btn">
                <img src="${avatarURL}" alt="Profile" class="w-8 h-8 rounded-full border border-gray-200">
                <span>${firstName}</span>
              </button>
              <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block border border-gray-200">
                <a href="profile.html" class="block px-4 py-2 text-gray-600 hover:bg-gray-50">Profile</a>
                <a href="dashboard.html" class="block px-4 py-2 text-gray-600 hover:bg-gray-50">Dashboard</a>
              </div>
            </div>

            <button class="logout-btn bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
              Logout
            </button>
          </div>
        `;

        // 🧭 Add profile redirection
        const profileButton = this.querySelector(".profile-btn");
        if (profileButton) {
          profileButton.addEventListener("click", () => {
            window.location.href = "profile.html";
          });
        }

      } else {
        // 🚫 User not logged in
        console.log("🚫 No user logged in (showing login/signup)");
        authSection.innerHTML = `
          <div class="flex items-center space-x-4">
            <a href="auth.html" class="text-gray-600 hover:text-indigo-600 transition duration-200">Login</a>
            <a href="auth.html" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200">
              Sign Up
            </a>
          </div>
        `;
      }

      feather.replace();
      this.setupLogoutHandler();
    });
  }

  // 🚪 Logout logic
  setupLogoutHandler() {
    const logoutBtn = this.querySelector(".logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        try {
          await auth.signOut();
          localStorage.removeItem("skillswap_current_user");
          console.log("👋 User logged out successfully");
          window.location.href = "index.html";
        } catch (err) {
          console.error("❌ Logout failed:", err);
        }
      });
    }
  }

  // 📱 Mobile nav toggle
  setupEventListeners() {
    this.addEventListener("click", (e) => {
      if (e.target.closest(".mobile-menu-button")) {
        this.toggleMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    const menu = this.querySelector(".mobile-menu");
    if (menu) menu.classList.toggle("hidden");
  }

  // 🧱 Render navbar layout
  render() {
    this.innerHTML = `
      <nav class="bg-white shadow-sm border-b sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <a href="index.html" class="flex items-center space-x-2">
                <img src="1.png.jpg" alt="SkillMate Logo" class="h-10 w-10 rounded-full object-cover">
                <span class="font-bold text-xl text-gray-800">SkillMate</span>
              </a>
            </div>

            <div class="flex items-center space-x-8">
              <a href="index.html" class="text-gray-600 hover:text-indigo-600 transition duration-200">Home</a>
              <a href="skills.html" class="text-gray-600 hover:text-indigo-600 transition duration-200">Skills</a>
              <a href="community.html" class="text-gray-600 hover:text-indigo-600 transition duration-200">Community</a>
            </div>

            <div class="auth-section flex items-center space-x-4">
              <a href="auth.html" class="text-gray-600 hover:text-indigo-600 transition duration-200">Login</a>
              <a href="auth.html" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200">Sign Up</a>
            </div>

            <button class="mobile-menu-button md:hidden p-2 rounded-lg hover:bg-gray-100 transition duration-200">
              <i data-feather="menu" class="w-5 h-5"></i>
            </button>
          </div>

          <div class="mobile-menu hidden md:hidden py-4 border-t">
            <div class="flex flex-col space-y-3">
              <a href="index.html" class="block py-2 text-gray-600 hover:text-indigo-600">Home</a>
              <a href="skills.html" class="block py-2 text-gray-600 hover:text-indigo-600">Skills</a>
              <a href="community.html" class="block py-2 text-gray-600 hover:text-indigo-600">Community</a>
            </div>
          </div>
        </div>
      </nav>
    `;
    feather.replace();
  }
}

customElements.define("custom-navbar", CustomNavbar);
