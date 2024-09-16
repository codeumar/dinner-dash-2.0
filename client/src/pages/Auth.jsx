import React from "react";
import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Auth = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Welcome to Dinner Dash 2.0</h1>
      <div className="btn-group">
        <button
          className={`btn ${showLogin ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>

        <button
          className={`btn ${showLogin ? "btn-secondary" : "btn-primary"}`}
          onClick={() => setShowLogin(false)}
        >
          Signup
        </button>
      </div>

      {showLogin ? <Login /> : <Signup />}
    </div>
  );
};

export default Auth;
