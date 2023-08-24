import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import Restaurants from "../components/admin/Restaurants";
import CreateStore from "../components/admin/CreateStore";
import AddProducts from "../components/admin/AddProducts";
const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Add this state to store the username

  useEffect(() => {
    const token = localStorage.getItem("token");
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

  return (
    <>
      <div className="container-fluid">
        <AdminNavbar
          onStoreClick={() => {
            setShowCreateStoreForm(true);
            setShowAddProductForm(false);
            setProductPage(false);
          }}
          onProductClick={() => {
            setShowCreateStoreForm(false);
            setShowAddProductForm(true);
            setProductPage(false);
          }}
          onHomeClick={() => {
            setProductPage(true);
            setShowCreateStoreForm(false);
            setShowAddProductForm(false);
          }}
        />
      </div>
      <div className="username-box">
        <h1 className="username-display">Welcome {username}</h1>
      </div>
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
    </>
  );
};

export default Dashboard;
