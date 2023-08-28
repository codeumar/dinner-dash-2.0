import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import OrderItemList from "./OrderItemList";

const AllOrder = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  const { userid } = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3003/order/getallbyuserid/${userid}`
      );
      console.log(response.data);
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  const openOrderModal = async (order) => {
    setSelectedOrder(order);
    fetchOrderItems(order.orderid);
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

  return (
    <div className="container">
      <h2>User Orders</h2>
      <ul className="list-group">
        {orders.length === 0 ? (
          <div className="container m-5">
            <h2>No Orders for this User</h2>
          </div>
        ) : (
          orders.map((order) => (
            <li key={order.orderid} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div className="container">
                  <strong>Restaurant No#:</strong> {order.restaurantid}
                  <br />
                  <strong>Order ID:</strong> {order.orderid}
                  <br />
                  <strong>Status:</strong> {order.status}
                  <br />
                  <strong>Total Price:</strong> {order.totalprice}
                </div>
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
              <h4>Order Items:</h4>
              <ul>
                {orderItems.map((item) => (
                  <li key={item.itemId}>
                    <OrderItemList item={item} />
                  </li>
                ))}
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

export default AllOrder;
