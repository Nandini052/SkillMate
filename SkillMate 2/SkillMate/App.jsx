import app from "./utils/firebaseInit.js";
console.log("Firebase initialized:", app);

import Signup from "auth.html";

function App() {
  return (
    <div className="App">
      <Signup />
    </div>
  );
}

export default App;
