import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const CreateStore = () => {
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [storeInfo, setStoreInfo] = useState({
    name: "",
    email: "",
    userid: id,
    phone: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    //e.preventDefault();
    try {
      if (
        storeInfo.name === "" ||
        storeInfo.email === "" ||
        storeInfo.phone === "" ||
        storeInfo.address === ""
      ) {
        setErrorMessage("Please fill in all the fields.");
        return;
      } else if (!isValidEmail(storeInfo.email)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      } else {
        setErrorMessage(null);
      }
      const token = localStorage.getItem("token");
      const headers = {
        authorization: token,
        CustomHeader: "custom-value",
      };

      await axios
        .post(
          "http://127.0.0.1:3003/restaurants/createnewrestaurant",
          {
            name: storeInfo.name,
            email: storeInfo.email,
            userid: storeInfo.userid,
            phone: storeInfo.phone,
            address: storeInfo.address,
          },
          { headers }
        )
        .then((res) => {
          setErrorMessage("Store Created Successfully");
        });
    } catch (error) {}
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="p-4 border rounded-lg shadow-lg"
        style={{
          backgroundColor: "#f8f9fa",
        }}
      >
        <h2 className="mb-4 text-center">Create Store</h2>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
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
                name="phone"
                value={storeInfo.phone}
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
                name="address"
                value={storeInfo.address}
                onChange={handleChange}
                required
                placeholder="Enter the Restuarent address"
              />
            </Form.Group>
          </div>

          <div className="text-center">
            <Button variant="primary" onClick={handleSubmit}>
              Create Store
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default CreateStore;
