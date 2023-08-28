import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemDetails from "./ItemDetails";

const OrderPage = () => {
  const { userid } = JSON.parse(localStorage.getItem("user"));
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(0);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [itemsdata, setitemsdata] = useState([]);

  useEffect(() => {
    fetchRestaurants();
    fetchOrders();
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
        `http://127.0.0.1:3003/restaurants/getallrestaurants/${userid}`,
        { headers }
      );
      console.log(response);
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3003/order/getall/${selectedRestaurantId}`
      );
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://127.0.0.1:3003/order/update/${orderId}`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const openOrderModal = async (order) => {
    setSelectedOrder(order);
    fetchOrderItems(order.orderid);
    fetchOrderItemsfromitems(order.orderid);
    const userDetails = await fetchUserDetails(order.userid);
    setSelectedOrderDetails({
      ...order,
      user: userDetails,
    });
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
    setOrderItems([]);
  };

  const fetchOrderItems = async (orderId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3003/order/items/${orderId}`
      );

      setOrderItems(response.data.data);
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };
  const fetchOrderItemsfromitems = async (itemId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3003/items/${itemId}`);

      setitemsdata(response.data.data);
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };

  const handleRestaurantButtonClick = (restaurantId) => {
    setSelectedRestaurantId(restaurantId);
    fetchOrders();
  };

  const handleFilterChange = (status) => {
    setSelectedStatus(status);
  };

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3003/auth/getuserbyid/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  return (
    <div className="container">
      <div className="container">
        <h2>Your Restaurants</h2>
        <div className="d-flex flex-wrap">
          {restaurants.map((restaurant) => (
            <Button
              key={restaurant.restaurantid}
              variant="info"
              className="m-2"
              onClick={() =>
                handleRestaurantButtonClick(restaurant.restaurantid)
              }
            >
              {restaurant.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="container">
        <h2>Your Orders</h2>
      </div>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="secondary">
            Filter by Status: {selectedStatus.toUpperCase()}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleFilterChange("all")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange("pending")}>
              Pending
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange("completed")}>
              Completed
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange("delivered")}>
              Delivered
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <ul className="list-group">
        {filteredOrders.length === 0 ? (
          <div className="container m-5">
            <h2>No Orders</h2>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <li key={order.orderid} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div className="container">
                  <strong>Restaurant No#:</strong> {order.restaurantid}
                  <br />
                  <strong>User ID:</strong> {order.userid}
                  <br />
                  <strong className="b-3">Order ID: {order.orderid}</strong>
                  <br />
                  <strong>Status:</strong> {order.status}
                  <br />
                  <strong>Total Price:</strong> {order.totalprice}
                </div>
                <Dropdown className="m-3">
                  <Dropdown.Toggle
                    variant="info"
                    id={`dropdown-${order.orderid}`}
                  >
                    {order.status}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() =>
                        handleStatusChange(order.orderid, "pending")
                      }
                    >
                      Pending
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleStatusChange(order.orderid, "completed")
                      }
                    >
                      Completed
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleStatusChange(order.orderid, "delivered")
                      }
                    >
                      Delivered
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="primary" onClick={() => openOrderModal(order)}>
                  View
                </Button>
              </div>
            </li>
          ))
        )}
      </ul>

      <Modal size="lg" show={selectedOrder !== null} onHide={closeOrderModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              {selectedOrderDetails && (
                <div>
                  <p className="b-3">
                    Order ID: {selectedOrderDetails.orderid}
                  </p>
                  {/* ... (other details) */}
                  {/* Display User Details */}
                  <h4>User Details:</h4>
                  <p>
                    <strong>User ID:</strong> {selectedOrderDetails.userid}
                    <br />
                    <strong>User Name:</strong> {selectedOrderDetails.user.name}
                    <br />
                    <strong>User Email:</strong>{" "}
                    {selectedOrderDetails.user.email}
                    <br />
                    <strong>User Phone:</strong>{" "}
                    {selectedOrderDetails.user.phone}
                    {/* ... (other user details) */}
                  </p>
                </div>
              )}
              <h4>Order Items:</h4>
              <ul>
                {orderItems.map((item) => {
                  const fetchItemDetails = async () => {
                    try {
                      const itemDetailsResponse = await axios.get(
                        `http://127.0.0.1:3003/items/${item.itemid}`
                      );
                      console.log(itemDetailsResponse);
                      return itemDetailsResponse.data;
                    } catch (error) {
                      console.error("Error fetching item details:", error);
                      return null;
                    }
                  };

                  return (
                    <li key={item.itemId}>
                      <ItemDetails
                        item={item}
                        fetchItemDetails={fetchItemDetails}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeOrderModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderPage;
