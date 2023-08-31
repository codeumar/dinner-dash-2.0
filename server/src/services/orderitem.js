const db = require("../models");

const createOrderItem = async (orderItemData) => {
  try {
    const orderItem = await db.orderitem.create(orderItemData);
  } catch (error) {
    throw error;
  }
};
const removeOrderedItemQuantity = async (itemId) => {
  const { itemid, quantity } = itemId;
  try {
    const item = await db.item.findOne({
      where: {
        itemid: itemid,
      },
    });

    if (!item) {
      throw new Error("Item not found");
    }
    const updatedQuantity = item.quantity - quantity;
    await item.update({
      quantity: updatedQuantity,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { createOrderItem, removeOrderedItemQuantity };
