import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";

const OrderItemList = ({ item }) => {
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/items/${item.itemid}`
      );
      setItemDetails(response.data);
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  return (
    <div>
      {itemDetails && (
        <Card className="mb-3">
          <img
            src={itemDetails.imageurl}
            alt=""
            style={{ height: "100px", width: "100px" }}
          />
          <Card.Header>Name: {itemDetails.name}</Card.Header>
          <Card.Body>
            <Card.Title>Quantity: {item.quantity}</Card.Title>
            <Card.Text>
              <strong>Description:</strong> {itemDetails.description}
              <br />
              <strong>Price:</strong> {itemDetails.price}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default OrderItemList;
