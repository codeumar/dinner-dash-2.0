import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const AddProducts = () => {
  const [storeInfo, setStoreInfo] = useState({
    name: "",
    email: "",
    restaurantId: "",
  });

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const headers = {
      authorization: token,
      CustomHeader: "custom-value",
    };
    console.log(token);
    try {
      const response = await axios.get(
        `http://127.0.0.1:3003/restaurants/getallrestaurants/${user.userid}`,
        { headers }
      );
      console.log(response);
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Store info:", storeInfo);
    setStoreInfo({
      name: "",
      email: "",
      restaurantId: "",
    });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="p-4 border rounded-lg shadow-lg"
        style={{
          backgroundColor: "#f8f9fa",
          padding: "2rem",
        }}
      >
        <h2 className="mb-4 text-center">Add Product</h2>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Form.Group controlId="storeName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={storeInfo.name}
                onChange={handleChange}
                required
                placeholder="Enter the store name"
              />
            </Form.Group>
          </div>

          <div className="mb-3">
            <Form.Group controlId="storeEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={storeInfo.email}
                onChange={handleChange}
                required
                placeholder="Enter the store email address"
              />
            </Form.Group>
          </div>

          <div className="mb-3">
            <Form.Group controlId="storeRestaurantId">
              <Form.Label>Restaurant</Form.Label>
              <Form.Select
                name="restaurantId"
                value={storeInfo.restaurantId}
                onChange={handleChange}
                required
              >
                <option value="">Select a restaurant</option>
                {restaurants.map((restaurant) => (
                  <option
                    key={restaurant.resturantid}
                    value={restaurant.resturantid}
                  >
                    {restaurant.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <input type="file" name="file" />
          <div className="text-center">
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddProducts;
