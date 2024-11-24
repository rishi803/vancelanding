import React from "react";
import "./App.css"; 

import megaphone from "./assets/megaphone.png";

const App = ({handleGoogleSignIn}) => {



  return (
    <div className="dashboard-card">
      <div className="login-section">
    <div className="circle-image">
      <img src={megaphone} alt="Profile" />
    </div>
    <h2>Access rate alert dashboard</h2>
    <p>Stay updated with real-time currency rates and manage your alerts.</p>
    <button onClick={handleGoogleSignIn} className="google-btn">
      Sign in with Google
    </button>
  </div>
    </div>
  );
};

export default App;
