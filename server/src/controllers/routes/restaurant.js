const jwt = require("jsonwebtoken");
const express = require("express");
const restaurantRouter = express.Router();
const {
  createNewRestaurant,
  getAllRestaurants,
  getAllRestaurantsbyid,
} = require("../../services/restaurant");
const verifyUser = require("../middlewares/verifyjwttoken");

restaurantRouter.post("/createnewrestaurant", verifyUser, async (req, res) => {
  try {
    const restaurantData = req.body;

    const restaurant = await createNewRestaurant(restaurantData);
    res.status(200).send(restaurant);
  } catch (error) {
    res.status(200).send(error);
  }
});

restaurantRouter.get("/getallrestaurants", verifyUser, async (req, res) => {
  try {
    const restaurant = await getAllRestaurants();
    res.status(200).send(restaurant);
  } catch (error) {
    res.status(200).send(error);
  }
});
restaurantRouter.get("/getallrestaurantsforfilter", async (req, res) => {
  try {
    const restaurant = await getAllRestaurants();
    res.status(200).send(restaurant);
  } catch (error) {
    res.status(200).send(error);
  }
});
restaurantRouter.get("/getallrestaurants/:id", verifyUser, async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await getAllRestaurantsbyid(id);
    res.status(200).send(restaurant);
  } catch (error) {
    res.status(200).send(error);
  }
});
module.exports = restaurantRouter;
