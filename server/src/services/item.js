const db = require("../models");

const additem = async (itemdata) => {
  try {
    return await db.item.create(itemdata);
  } catch (error) {
    throw new Error(error);
  }
};
const getAllFoodItems = async () => {
  try {
    return await db.item.findAll();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { additem, getAllFoodItems };
