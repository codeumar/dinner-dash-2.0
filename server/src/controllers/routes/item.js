const jwt = require("jsonwebtoken");
const express = require("express");
const itemRouter = express.Router();
const Cloudinary = require("cloudinary").v2;
Cloudinary.config({
  cloud_name: "dfgaay92d",
  api_key: "576263258294367",
  api_secret: "nHY6bmvb3mz1_kYhbG0fqIbU6js",
});
const verifyUser = require("../middlewares/verifyjwttoken");
const {
  additem,
  getAllFoodItems,
  getItemById,
} = require("../../services/item");

itemRouter.post("/additem", verifyUser, async (req, res) => {
  try {
    const files = req.files.img;

    console.log(files);
    Cloudinary.uploader.upload(files.tempFilePath, async (err, result) => {
      if (err) {
        console.log(err);
        res.status(201).send("Error in uploading image");
      }
      console.log(result);
      console.log(result.url);
      const restaurantData = req.body;
      console.log(req.body);
      restaurantData.imageurl = result.url;
      const item = await additem(restaurantData);

      res.status(200).send(result.url);
    });
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
itemRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const item = await getItemById(id);
    if (item === null) {
      res.status(200).json({ message: "-1" });
    } else {
      res.status(200).json(item);
    }
  } catch (error) {}
});

module.exports = itemRouter;
