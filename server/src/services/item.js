const db = require("../models");

const additem = async (itemdata) => {
  try {
    const existingItem = await db.item.findOne({
      where: {
        name: itemdata.name,
      },
    });

    if (existingItem) {
      return -1;
    }

    return await db.item.create(itemdata);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getAllFoodItems = async () => {
  try {
    return await db.item.findAll({
      where: {
        status: true,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
const getItemById = async (id) => {
  try {
    return await db.item.findOne({ where: { itemid: id } });
  } catch (error) {
    throw new Error(error);
  }
};

const getItemByrestaurantId = async (id) => {
  try {
    return await db.item.findAll({ where: { restaurantid: id } });
  } catch (error) {
    throw new Error(error);
  }
};
const retireitem = async (id, body) => {
  try {
    return await db.item.update(body, { where: { itemid: id } });
  } catch (error) {
    throw new Error(error);
  }
};
const restoreItem = async (id, body) => {
  try {
    return await db.item.update(body, { where: { itemid: id } });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  additem,
  getAllFoodItems,
  getItemById,
  retireitem,
  getItemByrestaurantId,
  restoreItem,
};
