// src/App.js
import React, { useState } from "react";
import Login from "./components/Pages/Login/Login";
import Dashboard from "./components/Pages/Dashboard/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    const correctEmail = process.env.REACT_APP_EMAIL;
    const correctPassword = process.env.REACT_APP_PASSWORD;

    if (email === correctEmail && password === correctPassword) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  // Check localStorage on initial load
  useState(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      {!isLoggedIn ? <Login onLogin={handleLogin} /> : <Dashboard />}
    </div>
  );
}

export default App;
