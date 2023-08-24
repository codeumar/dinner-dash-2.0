const db = require("../models");

const createOrderItem = async (orderItemData) => {
  try {
    const orderItem = await db.orderitem.create(orderItemData);
  } catch (error) {
    throw error;
  }
};

module.exports = createOrderItem;
