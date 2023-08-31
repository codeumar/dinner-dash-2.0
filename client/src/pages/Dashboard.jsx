import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import Restaurants from "../components/admin/Restaurants";
import CreateStore from "../components/admin/CreateStore";
import AddProducts from "../components/admin/AddProducts";
import OrderPage from "../components/admin/OrderPage";
const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Add this state to store the username

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role != "admin") navigate("/");
    if (token == null) {
      navigate("/");
    } else {
      const fetchedUsername = JSON.parse(localStorage.getItem("user"));
      setUsername(fetchedUsername.name);
    }
  }, []);

  const [showcreatestore, setShowCreateStoreForm] = useState(false);
  const [showaddproduct, setShowAddProductForm] = useState(false);
  const [showproductpage, setProductPage] = useState(true);
  const [showorderspage, setOrdersPage] = useState(false);
  const toggle = true;

  return (
    <>
      <div className="container-fluid">
        <AdminNavbar
          onStoreClick={() => {
            setOrdersPage(false);
            setShowCreateStoreForm(true);
            setShowAddProductForm(false);
            setProductPage(false);
          }}
          onProductClick={() => {
            setOrdersPage(false);
            setShowAddProductForm(true);
            setShowCreateStoreForm(false);
            setProductPage(false);
          }}
          onHomeClick={() => {
            setOrdersPage(false);
            setProductPage(true);
            setShowCreateStoreForm(false);
            setShowAddProductForm(false);
          }}
          onOrdersClick={() => {
            setOrdersPage(true);
            setProductPage(false);
            setShowCreateStoreForm(false);
            setShowAddProductForm(false);
          }}
          togglerValue={toggle}
        />
      </div>
      <div className="username-box">
        <h1 className="username-display">Welcome {username}</h1>
      </div>
      {showorderspage ? (
        <OrderPage />
      ) : (
        <div>
          <div className="container d-flex">
            <div className="container h-50 w-50">
              <img className="image" src="../public/restaurant.jpg" alt="" />
            </div>
            <div className="container h-50 w-50">
              {showproductpage && <Restaurants />}
              {showcreatestore && <CreateStore id={id} />}
              {showaddproduct && <AddProducts />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
