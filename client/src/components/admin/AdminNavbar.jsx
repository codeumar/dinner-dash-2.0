import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminNavbar = ({
  onStoreClick,
  onProductClick,
  onHomeClick,
  onOrdersClick,
  togglerValue,
}) => {
  const navigate = useNavigate();
  const logout = async (e) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
      CustomHeader: "custom-value",
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/logout`,
        null,
        {
          headers,
        }
      );

      if (res.status == 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      } else {
      }
    } catch (error) {
      if (error) {
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
        <Link className="navbar-brand ">Dinner Dash 2.0</Link>
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
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link
                onClick={onHomeClick}
                className="btn bg-white text-success mx-1"
                to="/"
              >
                Home
              </Link>
            </li>
            {togglerValue ? (
              <>
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
                  <button
                    onClick={onOrdersClick}
                    className="btn bg-white text-success mx-1"
                  >
                    Orders
                  </button>
                </li>
              </>
            ) : null}
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
