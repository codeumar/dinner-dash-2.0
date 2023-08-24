import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminNavbar = ({ onStoreClick, onProductClick, onHomeClick }) => {
  const navigate = useNavigate();
  const logout = async (e) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
      CustomHeader: "custom-value",
    };
    try {
      const res = await axios.post("http://localhost:3003/auth/logout", null, {
        headers,
      });
      console.log(res);
      if (res.status == 200) {
        console.log("Logout successful:");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      } else {
      }
    } catch (error) {
      if (error) {
        console.log("Logout failed:", error);
        alert("Your session have been expired, please login again");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      }
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="ms-5 mt-2">
      <nav className="navbar navbar-expand-lg navbar-dark bg-success ps-5 ">
        <Link className="navbar-brand fs-1" href="#">
          Dinner Dash 2.0
        </Link>
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
              <button
                onClick={onHomeClick}
                className="btn bg-white text-success mx-1"
              >
                Home
              </button>
            </li>
            <li className="nav-item active">
              <button
                onClick={onStoreClick}
                className="btn bg-white text-success mx-1"
              >
                Create Store
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={onProductClick}
                className="btn bg-white text-success mx-1"
              >
                Add Product
              </button>
            </li>
            <li className="nav-item">
              <Link className="btn bg-white text-success mx-1" to="#">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={logout}
                className="btn bg-white text-success mx-1"
                to="#"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
