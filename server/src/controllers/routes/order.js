const jwt = require("jsonwebtoken");
const express = require("express");
const orderRouter = express.Router();
const createOrderItem = require("../../services/orderitem");
const verifyUser = require("../middlewares/verifyjwttoken");
const { createOrder } = require("../../services/order");

orderRouter.post("/create", async (req, res) => {
  try {
    const { restaurantid, userid, items, totalprice, status } = req.body;

    const sendDataToDb = await createOrder({
      restaurantid: restaurantid,
      userid: userid,
      totalprice: totalprice,
      status: status,
    });
    console.log(sendDataToDb);
    const orderId = sendDataToDb.dataValues.orderid;
    items.map(async (item) => {
      await createOrderItem({
        orderid: orderId,
        itemid: item.itemid,
        price: item.price,
        quantity: item.quantity,
      });
    });

    res.status(200).json({
      message: "Order and Order Items created successfully",
      data: { order: "complete", orderItems: "ii" },
    });
  } catch (error) {}
});

module.exports = orderRouter;
