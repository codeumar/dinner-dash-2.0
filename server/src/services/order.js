const db = require("../models");

const createOrder = async (orderData) => {
  return await db.order.create(orderData);
};

module.exports = { createOrder };
