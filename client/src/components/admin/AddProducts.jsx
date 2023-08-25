import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

const AddProducts = () => {
  const [successMsg, setSuccessMessage] = useState("");
  const [errorMsg, setErrorMessage] = useState("");
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    restaurantId: 1,
  });
  const img = useRef();
  const [restaurants, setRestaurants] = useState([]);

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
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const saveItem = async (e) => {
    if (
      productInfo.name === "" ||
      productInfo.description === "" ||
      productInfo.price === 0 ||
      productInfo.quantity === 0 ||
      productInfo.restaurantId === 0 ||
      img.current.files[0] === undefined
    )
      return alert("Please fill all the fields");

    console.log(productInfo.restaurantId);
    e.preventDefault();
    console.log(img.current.files[0]);
    try {
      const formData = new FormData();
      formData.append("name", productInfo.name);
      formData.append("email", productInfo.email);
      formData.append("description", productInfo.description);
      formData.append("price", productInfo.price);
      formData.append("quantity", productInfo.quantity);

      formData.append("restaurantid", productInfo.restaurantId);
      formData.append("img", img.current.files[0]);
      const token = localStorage.getItem("token");
      console.log(formData);
      const headers = {
        authorization: token,
        CustomHeader: "custom-value",
        "Content-Type": "multipart/form-data",
      };
      await axios
        .post("http://127.0.0.1:3003/items/additem", formData, {
          headers,
        })
        .then((res) => {
          setSuccessMessage("Item Added Successfully");
        });
    } catch (error) {
      setErrorMessage("Item Adding Failed");
    }
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
        <Form>
          <div className="mb-3">
            <Form.Group controlId="storeName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={productInfo.name}
                onChange={handleChange}
                required
                placeholder="Enter Name"
              />
            </Form.Group>
          </div>

          <div className="mb-3">
            <Form.Group controlId="storeEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={productInfo.description}
                onChange={handleChange}
                required
                placeholder="Enter Description"
              />
            </Form.Group>
          </div>
          <div className="mb-3">
            <Form.Group controlId="storeEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={productInfo.price}
                onChange={handleChange}
                required
                placeholder="Enter Price"
              />
            </Form.Group>
          </div>
          <div className="mb-3">
            <Form.Group controlId="storeEmail">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={productInfo.quantity}
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
                value={productInfo.restaurantId}
                onChange={handleChange}
                required
              >
                <option value="">Select a restaurant</option>
                {restaurants.map((restaurant) => (
                  <option
                    key={restaurant.resturantid}
                    value={restaurant.resturantid}
                  >
                    {restaurant.restaurantid}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <input type="file" ref={img} name="file" />
          {successMsg && (
            <div>
              <p className="text-success">{successMsg}</p>
            </div>
          )}
          {errorMsg && (
            <div>
              <p className="text-success">{errorMsg}</p>
            </div>
          )}
          <div className="text-center">
            <Button onClick={saveItem} variant="primary" type="submit">
              Add Product
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddProducts;
