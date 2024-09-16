import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const AddProducts = () => {
  const [storeInfo, setStoreInfo] = useState({
    name: "",
    email: "",
    userId: "",
  });

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
      userId: "",
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
            <Form.Group controlId="storeUserId">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                name="userId"
                value={storeInfo.userId}
                onChange={handleChange}
                required
                placeholder="Enter the store user ID"
              />
            </Form.Group>
          </div>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Create Store
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddProducts;
