const db = require("../models");

const createOrder = async (orderData) => {
  return await db.order.create(orderData);
};
const getOrdersByRestaurantId = async (id) => {
  return await db.order.findAll({
    where: {
      restaurantid: id,
    },
  });
};
const getOrdersByUserId = async (id) => {
  return await db.order.findAll({
    where: {
      userid: id,
    },
  });
};

const updateOrder = async (orderid, status) => {
  return await db.order.update(
    {
      status: status,
    },
    {
      where: {
        orderid: orderid,
      },
    }
  );
};

const getOrdersByOrderId = async (id) => {
  return await db.orderitem.findAll({
    where: {
      orderid: id,
    },
  });
};

module.exports = {
  createOrder,
  getOrdersByUserId,
  getOrdersByRestaurantId,
  updateOrder,
  getOrdersByOrderId,
};
