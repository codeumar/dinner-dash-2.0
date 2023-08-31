import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/ContextReducer";

import ItemDetails from "./components/customer/ItemDetails";
import Footer from "./components/Footer";
import ViewItemInOrder from "./components/admin/ViewItemInOrder";
import RestaurantItems from "./components/admin/RestaurantItems";

const App = () => {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items/:itemId" element={<ItemDetails />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard/:id" element={<Dashboard />} />
            <Route path="/viewItem/:itemId" element={<ViewItemInOrder />} />
            <Route
              path="/restaurant/:restaurantid"
              element={<RestaurantItems />}
            />
            <Route path="*" element={<Auth />} />
          </Routes>
          <div>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </>
  );
};

export default App;
