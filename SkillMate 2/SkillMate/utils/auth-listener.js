// utils/auth-listener.js
import AuthSystem from './auth.js';

// Listen for changes in authentication state and redirect accordingly
AuthSystem.onAuthChange((user) => {
  const currentPage = window.location.pathname.split('/').pop();

  // Pages that shouldn't require authentication
  const publicPages = ["auth.html", "signup.html", "signin.html", "index.html"];

  // 🚫 If not logged in, redirect to auth page (unless already on a public page)
  if (!user && !publicPages.includes(currentPage)) {
    console.warn("⚠️ No user logged in, redirecting to auth.html");
    window.location.href = "auth.html";
    return;
  }

  // 🧭 If logged in but profile incomplete → force profile setup
  if (user && !user.profileComplete && currentPage !== "profile-setup.html") {
    console.log("🧠 Redirecting to profile setup...");
    window.location.href = "profile-setup.html";
    return;
  }

  // ✅ If logged in and profile complete → block returning to auth/signup pages
  if (user && user.profileComplete && publicPages.includes(currentPage)) {
    console.log("🚀 Redirecting to dashboard...");
    window.location.href = "dashboard.html";
    return;
  }

  console.log("🔁 Auth listener active on:", currentPage, "| User:", user ? user.email : "None");
});
