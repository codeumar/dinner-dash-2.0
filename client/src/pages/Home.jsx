import React, { useState, useEffect } from "react";
import Navbar from "../components/customer/Navbar";

import ItemCard from "../components/customer/ItemCard";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user != null && user.role != "user")
      navigate(`/dashboard/${user.userid}`);
    if (token == null) {
      navigate("/");
    } else {
    }
  }, []);
  const [items, setItems] = useState([]);
  const [searchitem, setSearch] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const getAllItems = async () => {
    const allitems = await axios.get("http://127.0.0.1:3003/items/getallitems");
    setItems(allitems.data);
  };
  useEffect(() => {
    getAllItems();
    getAllRestaurants();
  }, []);
  const filteredItems = items.filter((item) => {
    const itemName = item.name || "";
    console.log(item.restaurantid);
    console.log(selectedRestaurant);
    return (
      itemName.toLowerCase().includes(searchitem.toLowerCase()) &&
      (selectedRestaurant ? item.restaurantid == selectedRestaurant : true) // Compare restaurantId
    );
  });
  const [restaurants, setRestaurants] = useState([]); //
  const getAllRestaurants = async () => {
    const allRestaurants = await axios.get(
      "http://127.0.0.1:3003/restaurants/getallrestaurantsforfilter"
    ); // Replace with your API endpoint

    setRestaurants(allRestaurants.data);
  };

  const [showHomepage, setHomePage] = useState(true);
  const [showorderspage, setOrdersPage] = useState(false);
  return (
    <>
      <div>
        <Navbar
          onOrdersClick={() => {
            setOrdersPage(true);
            setHomePage(false);
          }}
          onHomeClick={() => {
            setOrdersPage(false);
            setHomePage(true);
          }}
        />
      </div>

      {showHomepage && (
        <>
          <div
            className="carousel slide"
            data-ride="carousel"
            style={{ objectFit: "fill !important" }}
          >
            <div className="carousel-inner h-100 w-100" id="carousel">
              <div className="carousel-caption" style={{ zIndex: "10 " }}>
                <h1 className="mb-5 text-white">Dinner Dash</h1>
              </div>
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src="https://source.unsplash.com/random/300×300?pizza"
                  alt="First slide"
                />
              </div>
              <div className="carousel-item ">
                <img
                  className="d-block w-100"
                  src="https://source.unsplash.com/random/300×300?pizza"
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item ">
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
          <div className="container-fluid m-5 justify-content-around h-50 w-100">
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                type="search"
                value={searchitem}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                aria-label="Search"
              />
              <select
                className="form-control"
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
              >
                <option value="">All Restaurants</option>
                {restaurants.map((restaurant) => (
                  <option
                    key={restaurant.restaurantid}
                    value={restaurant.restaurantid}
                  >
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="container-fluid">
            <div className="row">
              {filteredItems.length === 0 ? (
                <>
                  <div className="col col-sm-3">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">No Items Found</h5>
                        <p className="card-text">
                          No items found for the selected restaurant
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                filteredItems.map((item) => (
                  <div className="col col-sm-3" key={item.id}>
                    <ItemCard item={item} />
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
      {showorderspage && <AllOrder />}
    </>
  );
};

export default Home;
