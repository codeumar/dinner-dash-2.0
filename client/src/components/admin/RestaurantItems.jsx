import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Col, Container } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";

const RestaurantItems = () => {
  const { restaurantid } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [restaurantid]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3003/items/getallitemsbyrestaurantid/${restaurantid}`
      );
      console.log(response);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  const toggle = false;
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
      <div>
        <Container>
          <h5>Items for Restaurant {restaurantid}</h5>
        </Container>
        {items.map((item) => (
          <Container>
            <Col key={item.restaurantid} md={12} className="mb-4">
              <Card className="h-100 shadow-sm">
                <img
                  src={item.imageurl}
                  style={{ height: "150px", width: "150px" }}
                />
                <Card.Body>
                  <Card.Text>
                    <strong>Restaurant No#: </strong> {item.restaurantid}
                  </Card.Text>
                  <Card.Title>Name: {item.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <strong>Quantity: </strong> {item.quantity}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Container>
        ))}
      </div>
    </>
  );
};

export default RestaurantItems;
