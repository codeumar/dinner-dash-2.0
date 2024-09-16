import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ id, onStoreClick, onproductClick, onHomeClick }) => {
  const navigate = useNavigate();
  const logout = async (e) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
      CustomHeader: "custom-value",
    };
    try {
      const res = await axios.post(
        "http://localhost:3001/auth/logout",
        headers
      );

      if (res.status == 200) {
        console.log("Logout successful:");
        localStorage.removeItem("token");
        navigate("/");
      } else {
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="ms-5 mt-2">
      <nav className="navbar navbar-expand-lg navbar-primary bg-light ">
        <a className="navbar-brand" href="#">
          Dinner Dash 2.0 (Welcome {id}!)
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <button onClick={onHomeClick} className="nav-link">
                Home
              </button>
            </li>
            <li className="nav-item active">
              <button onClick={onStoreClick} className="nav-link">
                Create Store
              </button>
            </li>
            <li className="nav-item">
              <button onClick={onproductClick} className="nav-link">
                Add Product
              </button>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <Link onClick={logout} className="nav-link ">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
