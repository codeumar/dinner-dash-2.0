import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const CreateStore = () => {
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
        <h2 className="mb-4 text-center">Create Store</h2>
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
                placeholder="Enter the Restuarent Name"
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
                placeholder="Enter the Restuarent Email address"
              />
            </Form.Group>
          </div>

          <div className="mb-3">
            <Form.Group controlId="storeUserId">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="userId"
                value={storeInfo.userId}
                onChange={handleChange}
                required
                placeholder="Enter the Restuarent Phone"
              />
            </Form.Group>
          </div>
          <div className="mb-3">
            <Form.Group controlId="storeUserId">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="userId"
                value={storeInfo.userId}
                onChange={handleChange}
                required
                placeholder="Enter the Restuarent address"
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

export default CreateStore;
