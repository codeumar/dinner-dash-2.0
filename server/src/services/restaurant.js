const db = require("../models");

const createNewRestaurant = async (restaurentData) => {
  return await db.restaurant.create(restaurentData);
};
const getAllRestaurants = async () => {
  return await db.restaurant.findAll();
};
const getAllRestaurantsbyid = async (userid) => {
  try {
    const restaurants = await db.restaurant.findAll({
      where: {
        userid: userid,
      },
    });
    return restaurants;
  } catch (error) {
    console.error("Error retrieving restaurants:", error);
    throw error;
  }
};

module.exports = {
  createNewRestaurant,
  getAllRestaurants,
  getAllRestaurantsbyid,
};
