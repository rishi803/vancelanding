import { useState } from 'react'
import Home from './Home.jsx'
import Dashboard from './Dashboard.jsx'
import './App.css'
import "./firebase.js";

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = () => {
    console.log('cl');
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
  
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  const handleSignOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Error during sign-out:", error);
      });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!user ? <Home handleGoogleSignIn={handleGoogleSignIn} /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} onSignOut={handleSignOut} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
