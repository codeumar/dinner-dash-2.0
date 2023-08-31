import React, { useState, useEffect } from "react";
import Navbar from "../components/customer/Navbar";

import ItemCard from "../components/customer/ItemCard";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import AllOrder from "../components/customer/AllOrders";

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

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const getAllItems = async () => {
    const allitems = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/items/getallitems`
    );
    setItems(allitems.data);
  };
  useEffect(() => {
    getAllItems();
    getAllRestaurants();
  }, []);
  const filteredItems = items.filter((item) => {
    return selectedRestaurant ? item.restaurantid == selectedRestaurant : true;
  });
  const [restaurants, setRestaurants] = useState([]); //
  const getAllRestaurants = async () => {
    const allRestaurants = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/restaurants/getallrestaurantsforfilter`
    );

    setRestaurants(allRestaurants.data);
  };
  const getRestaurantItems = async (restaurantId) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BASE_URL
      }/items/getallitemsbyrestaurantid/${restaurantId}`
    );

    setItems(response.data);
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
          <div className="container m-5 flex flex-row justify-content-around ">
            <select
              className="form-control"
              value={selectedRestaurant}
              onChange={(e) => {
                setSelectedRestaurant(e.target.value);
                getRestaurantItems(e.target.value);
              }}
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
          </div>
          <div className="container">
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
                <div className="row row-cols-1 row-cols-md-3 g-6">
                  {filteredItems.map((item) => (
                    <div className="col" key={item.id}>
                      <ItemCard item={item} />
                    </div>
                  ))}
                </div>
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
