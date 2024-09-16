import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import CreateStore from "./components/CreateStore";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/home/createstore" element={<CreateStore />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
