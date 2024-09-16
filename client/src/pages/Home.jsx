import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CreateStore from "../components/CreateStore";
import AddProducts from "../components/AddProducts";
import Products from "../components/Products";
import Cookies from "js-cookie";
const Home = () => {
  const { id } = useParams();
  const [showcreatestore, setShowCreateStroeForm] = useState(false);
  const [showaddproduct, setShowAddProductForm] = useState(false);
  const [showproductpage, setProductPage] = useState(true);

  return (
    <>
      <Navbar
        id={id}
        onStoreClick={() => {
          setShowCreateStroeForm(true);
          setShowAddProductForm(false);
          setProductPage(false);
        }}
        onproductClick={() => {
          setShowCreateStroeForm(false);
          setShowAddProductForm(true);
          setProductPage(false);
        }}
        onHomeClick={() => {
          setProductPage(true);
          setShowCreateStroeForm(false);
          setShowAddProductForm(false);
        }}
      />

      {showproductpage && <Products />}
      {showcreatestore && <CreateStore />}
      {showaddproduct && <AddProducts />}
    </>
  );
};

export default Home;
