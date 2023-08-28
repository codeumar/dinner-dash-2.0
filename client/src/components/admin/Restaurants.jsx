import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user) return;
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

  return (
    <Container>
      <h1 className="my-4">Restaurant List {restaurants.length}</h1>
      <h3 className="my-4">Total: {restaurants.length}</h3>
      <Row>
        {restaurants.map((restaurant) => (
          <Col key={restaurant.restaurantid} md={12} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Text>
                  <strong>Restaurant No#: </strong> {restaurant.restaurantid}
                </Card.Text>
                <Card.Title>Name: {restaurant.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Email: {restaurant.email}
                </Card.Subtitle>
                <Card.Text>Address: {restaurant.address}</Card.Text>
                <Card.Text>
                  <strong>Phone: </strong> {restaurant.phone}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-top-0 text-center"></Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Restaurants;
