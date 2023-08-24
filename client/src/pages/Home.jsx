import React, { useState, useEffect } from "react";
import Navbar from "../components/customer/Navbar";

import ItemCard from "../components/customer/ItemCard";
import Footer from "../components/Footer";
import Carousel from "../components/customer/Carousel";
import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchitem, setSearch] = useState("");
  const getAllItems = async () => {
    const allitems = await axios.get("http://127.0.0.1:3003/items/getallitems");
    setItems(allitems.data);
  };
  useEffect(() => {
    getAllItems();
  }, []);
  const filteredItems = items.filter((item) => {
    const itemName = item.name || ""; // Handle case where item.name is null
    return itemName.toLowerCase().includes(searchitem.toLowerCase());
  });
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div
        id="carouselExampleFade"
        className="carousel slide"
        data-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div className="carousel-inner h-100 w-100" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10 " }}>
            <h1 className="mb-5 text-white">Dinner Dash</h1>
          </div>
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/random/300×300?food"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/random/300×300?pizza"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://source.unsplash.com/random/300×300?burger"
              alt="Third slide"
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <div className="container-fluid m-5 justify-content-around h-50 w-50">
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            value={searchitem}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
      <div className="container-fluid">
        <div className="row">
          {filteredItems.map((item) => (
            <div className="col col-md-3" key={item.id}>
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
