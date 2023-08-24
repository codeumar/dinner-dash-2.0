const jwt = require("jsonwebtoken");
const express = require("express");
const itemRouter = express.Router();

const verifyUser = require("../middlewares/verifyjwttoken");
const { additem, getAllFoodItems } = require("../../services/item");

itemRouter.post("/additem", verifyUser, async (req, res) => {
  try {
    const restaurantData = req.body;
    const item = await additem(restaurantData);
    console.log(item);
    res.status(200).send(item);
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
  }
});
itemRouter.get("/getallitems", async (req, res) => {
  try {
    const items = await getAllFoodItems();
    res.status(200).send(items);
  } catch (error) {}
});

module.exports = itemRouter;
