const jwt = require("jsonwebtoken");
const express = require("express");
const orderRouter = express.Router();
const {
  createOrderItem,
  removeOrderedItemQuantity,
} = require("../../services/orderitem");
const verifyUser = require("../middlewares/verifyjwttoken");
const {
  createOrder,
  getOrdersByUserId,
  updateOrder,
  getOrdersByOrderId,
  getOrdersByRestaurantId,
} = require("../../services/order");

orderRouter.post("/create", async (req, res) => {
  try {
    const { restaurantid, userid, items, totalprice, status } = req.body;

    const sendDataToDb = await createOrder({
      restaurantid: restaurantid,
      userid: userid,
      totalprice: totalprice,
      status: status,
    });
    //(sendDataToDb);
    const orderId = sendDataToDb.dataValues.orderid;
    items.map(async (item) => {
      await createOrderItem({
        orderid: orderId,
        itemid: item.itemid,
        price: item.price,
        quantity: item.quantity,
      });
      await removeOrderedItemQuantity({
        itemid: item.itemid,
        quantity: item.quantity,
      });
    });

    res.status(200).json({
      message: "Order and Order Items created successfully",
      data: { order: "complete", orderItems: "ii" },
    });
  } catch (error) {}
});

orderRouter.get("/getall/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await getOrdersByRestaurantId(id);
    //(orders);
    res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching orders",
      data: error,
    });
  }
});
orderRouter.get("/getallbyuserid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await getOrdersByUserId(id);
    //(orders);
    res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching orders",
      data: error,
    });
  }
});
orderRouter.get("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await getOrdersByOrderId(id);
    //(orders);
    res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in fetching orders",
      data: error,
    });
  }
});

//write a route to updated order
orderRouter.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await updateOrder(id, status);
    res.status(200).json({
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in updating order",
      data: error,
    });
  }
});

module.exports = orderRouter;
