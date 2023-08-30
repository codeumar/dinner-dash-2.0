import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import CartModal from "../../Modals/CartModal";
import Cart from "../customer/Cart";
import { useCart } from "../../context/ContextReducer";
import axios from "axios";

const Navbar = ({ onHomeClick, onOrdersClick }) => {
  const cartData = useCart();

  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
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
        //onHomeClick();
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
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success ps-5 ">
        <Link className="navbar-brand">Dinner Dash 2.0</Link>
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
          <ul className="navbar-nav me-auto ma-2">
            <li className="nav-item active">
              <button className="nav-link active fs-4" onClick={onHomeClick}>
                Home
              </button>
            </li>
            {localStorage.getItem("token") ? (
              <li className="nav-item active">
                <button
                  className="nav-link active fs-4"
                  onClick={onOrdersClick}
                >
                  My Orers
                </button>
              </li>
            ) : (
              ""
            )}
          </ul>
          {!localStorage.getItem("token") ? (
            <div className="d-flex  mr-5">
              <Link to="/auth" className="btn bg-white text-success mx-1 ">
                Login/Signup
              </Link>
            </div>
          ) : (
            <>
              <div
                className="btn bg-white text-success mx-1"
                onClick={() => {
                  setCartView(true);
                }}
              >
                My Cart{"  "}
                <Badge pill bg="danger">
                  {cartData.length}
                </Badge>
              </div>
              {cartView ? (
                <CartModal
                  onClose={() => {
                    setCartView(false);
                  }}
                >
                  <Cart />
                </CartModal>
              ) : (
                ""
              )}
              <div onClick={logout} className="btn bg-white text-success mr-5">
                Logout
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
